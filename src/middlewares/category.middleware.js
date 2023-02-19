import { Categories } from '../database/models/index';
export const checkIfCategoryExistsByName = async (req, res, next) => {
  const { name } = req.body;
  const categories = await Categories.findOne({
    where: { name: name.toLowerCase() },
  });
  if (categories)
    return res.status(409).json({ message: 'Category already exists' });
  next();
};

export const checkIfCategoryExistById = async (req, res, next) => {
  const { categoryId } = req.body;
  const categories = await Categories.findOne({ where: { id: categoryId } });
  if (!categories)
    return res.status(404).json({ message: "Category doesn't exist" });
  next();
};
