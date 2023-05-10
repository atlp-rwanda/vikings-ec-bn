import Joi from 'joi';

const validatePagination = async (req, res, next) => {
    const paginationSchema = Joi.object({
        limit: Joi.number().integer().min(1),
        page: Joi.number().integer().min(1)
    });
    const { error } = paginationSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '') });
    }
    next();
};

export default validatePagination;
