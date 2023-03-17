import { Categories } from '../database/models/index';
export class CategoryService {
	static async getCategoryById(id) {
		return Categories.findOne({ where: { id } });
	}
}