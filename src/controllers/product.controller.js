import { ProductService } from '../services/product.service';

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
      products.totalItems=rows.length
      products.rows=rows
    }
    return res.status(200).json({ products: products });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: 'Failed to retrieve products' });
  }
};
