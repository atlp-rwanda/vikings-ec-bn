import { Categories } from '../database/models/index';

export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = {
      name: name.toLowerCase(),
    };
    const categories = await Categories.create(category);
    return res
      .status(201)
      .json({ message: 'Category added successfully', category: categories });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: 'Error while creating a category' });
  }
};
