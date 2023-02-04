import {Categories} from '../database/models/index';
export const checkIfCategoryExists = async (req, res, next) => {
  const {name}=req.body
    const categories = await Categories.findOne({
      where: { name: name.toLowerCase() },
    });
    if (categories) return res.status(400).json({ message: 'Category already exists!' });
    next();
  };

  export const checkCategory = async (req, res, next) => {
    const {category} = req.body
    const categories = await Categories.findOne({ where: { name: category.toLowerCase()} });
    if (!categories)
      return res.status(404).json({ message: "Product category doesn't exist" });
    req.body.categoryId = categories.id;
    next();
  };