import path from 'path';
import { Products } from '../database/models/index';
import { uploadPhoto } from '../utils/cloudinary.util';
import { ProductService } from '../services/product.service';
import { Op } from 'sequelize';

export const checkIfProductExists = async (req, res, next) => {
  const { name } = req.body;
  const getProduct = await Products.findOne({
    where: { name: name },
  });
  if (getProduct) res.status(409).json({ message: 'Product already exists' });
  else next();
};

export const checkProductAvailable = async (req, res, next) => {
  const { productId } = req.body;
  const getProduct = await Products.findOne({
    where: { id: productId },
  });
  if (!getProduct)
    return res.status(404).json({ message: 'Product not found' });
    req.product = getProduct;
  next();
};

export const checkIfProductIsAvailableById = async (req, res, next) => {
  const product = req.product;
  const { role } = req.user;
  if (role === 'buyer' && !product.isAvailable) {
    return res.status(404).json({ message: 'Product is not available' });
  }
  next();
};

export const uploadImages = async (req, res, next) => {
  const images = [];
  for (let i = 0; i < req.files.images.length; i++) {
    const { url } = await uploadPhoto(req, res, req.files.images[i]);
    images.push(url);
  }
  req.body.images = images;
  next();
};
export const checkExtensions = (...extensions) => {
  return (req, res, next) => {
    for (let i = 0; i < req.files.images.length; i++) {
      const ext = path.extname(req.files.images[i].name);
      if (!extensions.includes(ext)) {
        return res.status(400).json({
          message: `Invalid extension for file '${req.files.images[i].name}'`,
        });
      }
    }
    next();
  };
};
export const checkNumberOfImages = (req, res, next) => {
  const { images } = req.files;
  if (images.length <= 3 || images.length == null)
    return res.status(400).json({ message: 'Please insert at least 4 images' });
  next();
};

export const checkIfProductExistsById = async (req, res, next) => {
  const productId = req.params.productId;
  const product = await ProductService.getProductById(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  req.product = product;
  next();
};

export const checkIfSellerOwnsProduct = async (req, res, next) => {
  const productId =req.sale?.productId || req.params.productId;
  const product =
    req.product || (await ProductService.getProductById(productId));
  const sellerId = product.userId;
  const { id, role } = req.user;
  if (role === 'seller' && id !== sellerId) {
    return res.status(400).json({
      message: "Product doesn't exists in your collection",
    });
  }
  next();
};
export const receivedQueryFormat = async (req, res, next) => {
  const receivedQuery = req.query;
  if (Object.keys(receivedQuery).length === 2) {
    next();
  } else {
    const formatedQuery = {};
    if (receivedQuery.name) {
      formatedQuery.name = { [Op.iLike]: `%${receivedQuery.name}%` };
    }
    if (receivedQuery.category) {
      formatedQuery.categoryId = receivedQuery.category;
    }
    if (receivedQuery.minPrice && receivedQuery.maxPrice) {
      formatedQuery.price = {
        [Op.between]: [receivedQuery.minPrice, receivedQuery.maxPrice],
      };
    } else if (receivedQuery.minPrice) {
      formatedQuery.price = { [Op.gte]: receivedQuery.minPrice };
    } else if (receivedQuery.maxPrice) {
      formatedQuery.price = { [Op.lte]: receivedQuery.maxPrice };
    }
    if (receivedQuery.expireDate) {
      formatedQuery.expiryDate = receivedQuery.expireDate + 'T00:00:00.000Z';
    }
    formatedQuery.limit = req.query['limit'];
    formatedQuery.page = req.query['page'];
    req.query = formatedQuery;
    next();
  }
};


