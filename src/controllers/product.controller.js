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
    return res
      .status(500)
      .json({
        error: err.message,
        message: 'Error occured while creating a product',
      });
  }
};
