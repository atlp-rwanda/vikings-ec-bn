import { SalesService } from "../services/sales.service";
import { CategoryService } from "../services/category.service";
import { ProductService } from "../services/product.service";
import { WishService } from "../services/wishlist.service";

const knownStats = {
  wishes:'wishes',
  sales: 'sales',
  expiredProduct:'expired',
  productCreated: 'product-created',
};

export const validateStats  = async (req, res, next) => {

    if(!req.query.include){
        req.statsFields = Object.keys(knownStats).map(each => knownStats[each]);
    }
    else {
        req.statsFields = req.query.include.split(',');
    }
    req.stats = {}
    next()
    
};
export const getWishes = async (req, res, next) => {
    if(req.statsFields.includes(knownStats.wishes)){
        const sellerId = req.user.id;
      const start = req.query.start;
      const end = req.query.end;

        const wishes = await WishService.getAllWishes(start, end);
      const sellerWishes = await Promise.all(wishes.map(eachWish => {
        return new Promise((resolve, reject) => {
          (async () => {
            try{
              let products = await Promise.all(eachWish.productsId.map(eachProductId => {
                return ProductService.getProductById(eachProductId);
              }));
              products = products.filter(each => each.userId === sellerId);
              resolve({wish:eachWish, products})
            }catch(e){
              reject(e);
            }
          })();
          
        });
      }));
      let productWithWishes = sellerWishes.reduce((previousValue, currentWish) => {
        const productWished = currentWish.products.forEach(each => {
          const eachWish = {id: each.id, name: each.name}
          if(!previousValue[eachWish.id]){
            previousValue[eachWish.id] = {...eachWish, count : 0}
          }
          previousValue[eachWish.id].count = previousValue[eachWish.id].count + 1;
        })
      
        return previousValue;
      }, {});
      productWithWishes = Object.keys(productWithWishes).map(each => productWithWishes[each]);
    req.stats = {...req.stats, wishes: productWithWishes};
    }
    next();
}
export const getSales = async (req, res, next) => {
    if(req.statsFields.includes(knownStats.sales)){
        const start = req.query.start;
      const end = req.query.end;
        const sellerId = req.user.id;

        const stats = await SalesService.getAllSalesStats(start, end);
      const productWithSales = await Promise.all(
        stats.map((sale) => {
          return new Promise((resolve, reject) => {
            ProductService.getProductById(sale.productId)
              .then((product) => {
                resolve({product,sale});
              })
              .catch(reject);
          });
        })
      );

      const productSalesStats = productWithSales.filter(each => {
        return each.product.userId === sellerId
      }).map(each => {
        return each;
      }).reduce((previousValue,currentValue) => {
          if(!previousValue[currentValue.product.id]){
            previousValue[currentValue.product.id] = {
              totalSold : 0,
              name: currentValue.product.name,
              wishes: currentValue.product.wished,
              sales: 0,
              price: currentValue.product.price,
              categoryId: currentValue.product.categoryId
            }
          }
          previousValue[currentValue.product.id]["totalSold"] =
            previousValue[currentValue.product.id]["totalSold"] + Number(currentValue.sale.quantitySold);

          previousValue[currentValue.product.id]["sales"] =
            previousValue[currentValue.product.id]["sales"] + 1;
         return previousValue ;
      }, {});
      const productStatistics = Object.keys(productSalesStats).map(each =>{
        return {
          productId: each,
          ...productSalesStats[each]
        }
      })
         
      const salesbycategory = productStatistics.reduce((previousValue,currentValue) => {
        if(!previousValue[currentValue.categoryId]){
          previousValue[currentValue.categoryId] = 0
        }
        previousValue[currentValue.categoryId] = previousValue[currentValue.categoryId] + 1
        return previousValue
      },{})
      const salesWithcategoryName = await Promise.all( Object.keys(salesbycategory).map(each =>{
        return new Promise((resolve, reject) => {
          CategoryService.getCategoryById(each)
            .then((category) => {
              resolve({
                category : category.name,
                count: salesbycategory[each],
                categoryId: category.id
              });
            })
            .catch(reject);
        });
      })
      )
      req.stats = {...req.stats, sales: {
        productStatistics,
        categorySales: salesWithcategoryName
      },}
    }
    next();
}
export const getProductCreated = async (req, res, next) => {
    if(req.statsFields.includes(knownStats.productCreated)){
        const sellerId = req.user.id;
        const start = req.query.start;
        const end = req.query.end;
        const productStats = await ProductService.getProductsStatsbySeller(start, end, sellerId);
      
        req.stats = {...req.stats, productCreated: productStats.length,}
    }
    next();
}
export const getExpired = async (req, res, next) => {
    if(req.statsFields.includes(knownStats.expiredProduct)){
        const sellerId = req.user.id;

        const products = await ProductService.getExpiredProductStats()
      const productWithTotalLost = products.map(product =>{
        return {
          id: product.id,
          quantity: product.quantity,
          price: product.price,
          totalPrice: product.quantity * product.price
        }
      });
      const totalLost = productWithTotalLost.reduce((total,current) => {
        return total + current.totalPrice;
      }, 0);
      req.stats = {...req.stats, expired:{
        totalCost: totalLost,
        details: productWithTotalLost,
      },
    }
    }
    next();
}