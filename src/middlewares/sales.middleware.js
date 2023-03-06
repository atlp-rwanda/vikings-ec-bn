import { SalesService } from '../services/sales.service';

export const checkIfSaleExists = async (req, res, next) => {
    const saleId = req.params.saleId;
    const sale = await SalesService.getSale(saleId);
    if (!sale) {
        return res.status(404).json({ message: 'Sale is not found' });
    }
    req.sale = sale;
    next();
};