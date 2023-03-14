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

export const getCategories = async (req, res) => {
	try {
		const categories = await Categories.findAll();
		
		return res.status(200).json({ categories: categories });
	} catch (error) {
		return res
			.status(500)
			.json({
				error: error.message,
				message: 'Could not retrieve categories, try again',
			});
	}
};
