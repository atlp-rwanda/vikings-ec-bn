/* eslint-disable no-undef */
import { ProductService } from '../services/product.service';
import { knownSchedulingTime, schedule } from '../utils/scheduling.util';
import { durationToCronRepetition } from '../utils/date.util';
import { delistExpiredProducts } from '../services/delistExpiredProduct.service';
import { sendEmail } from '../utils/sendEmail.util';
import { emailConfig } from '../utils/mail.util';
import { expiredProductMessage } from '../utils/mailTemplates.util';


export const createProduct = async (req, res) => {
  try {
    const { ...fields } = req.body;
    const userId = req.user.id;
    const productInfo = {
      ...fields,
      userId,
    };
    const product = await ProductService.createProduct(productInfo);
    return res
      .status(201)
      .json({ message: 'Product created successfully', product: product });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Error occured while creating a product',
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { limit, page } = req.query;
    let products = await ProductService.getAllProducts(limit, page);
    const { role, id } = req.user;
    if (role === 'seller') {
      const rows = products.rows.filter((product) => product.userId === id);
      products.totalItems = rows.length;
      products.rows = rows;
    }
    if (role === 'buyer') {
      const rows = products.rows.filter(
        (product) => product.isAvailable === true
      );
      products.totalItems = rows.length;
      products.rows = rows;
    }
    return res.status(200).json({ products: products });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: 'Failed to retrieve products' });
  }
};
export const removeExpiredProducts = async (req, res) => {
  try {
    const { isExpired } = req.body;
    const productId = req.params.productId;
    const isAvailable = false;

    await ProductService.updateProduct({ isExpired, isAvailable }, productId);
    sendEmail(
      emailConfig({
        email: req.user.email,
        subject: 'Product has expired',
        content: expiredProductMessage(req.product),
      })
    );

    return res
      .status(200)
      .json({ message: 'Expired product was removed successfully' });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: 'Failed to remove expired product from list',
    });
  }
};

const repetitionDuration = process.env.CRON_PERIOD
  ? durationToCronRepetition(process.env.CRON_PERIOD)
  : knownSchedulingTime.everySecond;
schedule(repetitionDuration, function () {
  delistExpiredProducts();
});

export const searchProductController = async (req, res) => {
  if (Object.keys(req.query).length === 2) {
    return getAllProducts(req, res);
  }
  const { limit, page } = req.query;
  delete req.query.limit;
  delete req.query.page;
  try {
    const result = await ProductService.searchProduct(req.query, limit, page);
    return res.status(200).json({ products: result });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      message: 'Error occured while searching for a product',
    });
  }
};
export const getSpecificProduct = async (req, res) => {
  try {
    let product = req.product;
    return res.status(200).json({ product: product });
  } catch(err) {
    return res.status(500).json({
      error: err.message,
      message: 'Error occured while retrieving a product',
      
    });
  }
};
export const markAvailableProduct = async (req, res) => {
  try {
    const {isAvailable} = req.body;
    const productId = req.product.id;
    await ProductService.updateProduct( {isAvailable}, productId);
   return res.status(200).json({ message: 'product is available now' });
   
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: 'Error occured while marking product',
    });
  }
};
export const updateProduct = async (req, res) => {
  try{
    const productId = req.product.id;
     await ProductService.updateProduct(req.body, productId);
    return res.status(200)
    .json({ message: 'Product updated successfuly' });
  } catch (err) {
    res.status(500).json({ error: err.message,
       message: 'Error occured while updating for a product'});
  }
};
 
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.product.id;
     await ProductService.deleteProduct(productId);
   return res.status(200)
    .json({message:'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message,
      message: 'Error occured while deleting product' });
  }
};
