import Joi from 'joi';
const productValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).required(),
  price: Joi.number().integer().required(),
  categoryId: Joi.string().uuid().required(),
  expiryDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).allow(''),
  bonus: Joi.number().integer().allow(''),
  quantity:Joi.number().integer().required(),
  oldImages: Joi.alternatives().try(
    Joi.string().allow(''),
    Joi.array().items(Joi.string())
  )
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
