import { Products } from '../database/models/index';
import { uploadPhoto } from '../utils/cloudinary.util';

export const checkIfProductExists = async (req, res, next) => {
  const { name } = req.body;
  const getProduct = await Products.findOne({
    where: { name: name },
  });
  if (getProduct) res.status(404).json({ message: 'Product already exists' });
  else next();
};

export const uploadImages = async(req, res, next) => {
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
    for(let i=0;i<req.files.images.length;i++){
      const ext = req.files.images[i].name.split('.').pop().toLowerCase();
    if (!extensions.includes(ext)) {
      return res.status(400).json({ message: `Invalid extension for file '${req.files.images[i].name}'` });
    }
    }
    next();
  };
};
export const checkNumberOfImages = (req, res, next) => {
  const {images} = req.files;
  if (images.length <= 3||images.length==null)
    return res.status(400).json({ message: 'Please insert atleat 4 images' });
  next();
};
