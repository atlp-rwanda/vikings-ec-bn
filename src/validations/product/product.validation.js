import Joi from 'joi';
const productValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().integer(),
  categoryId: Joi.string().uuid(),
  expiryDate: Joi.string().required(),
  bonus: Joi.number().integer(),
});

export const productValidation = async (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};
