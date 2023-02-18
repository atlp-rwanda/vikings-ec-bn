import Joi from 'joi';
const productValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().integer(),
  category: Joi.string().required(),
  expiryDate: Joi.string().required(),
  bonus: Joi.number().integer(),
});

const productValidation = async (req, res, next) => {
  const { error } = productValidationSchema.validate(req.body,req.user, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};
export default productValidation;
