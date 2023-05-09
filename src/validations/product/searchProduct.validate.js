import { ProductService } from '../../services/product.service';
export const validateSearchCriteria = async (req, res, next) => {
  const {
    name,
    category,
    minPrice,
    maxPrice,
    expireDate,
    limit,
    page
  } = req.query;
  if (name && !/^[a-zA-Z0-9\s-]+$/.test(name)) {
    return res.status(400).json({ error: 'Invalid product name' });
  }
  if (category && !/^[a-zA-Z0-9\s]+$/.test(category)) {
    return res.status(400).json({ error: 'Invalid category name' });
  }
  if (minPrice && isNaN(minPrice)) {
    return res.status(400).json({ error: 'Invalid minimum price' });
  }
  if (maxPrice && isNaN(maxPrice)) {
    return res.status(400).json({ error: 'Invalid maximum price' });
  }
  if (expireDate && !/^\d{4}-\d{2}-\d{2}$/.test(expireDate)) {
    return res.status(400).json({ error: 'Invalid expire date' });
  }
  if (category) {
    const getCategoryId = await ProductService.searchCategoryByName(category);
    if (!getCategoryId) {} else {
      req.query['category'] = getCategoryId.id;
    }
  }
  if (req.user.role === 'seller' && Object.keys(req.query).length > 2) {
    return res.status(403).json({
      message: 'You are not allowed to perform this task',
    });
  }
  next();
  };

