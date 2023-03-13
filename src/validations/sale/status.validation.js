import Joi from 'joi';
export const statusValidationSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'accepted', 'declined', 'delivered', 'shipping')
    .required(),
});

const statusValidation = async (req, res, next) => {
  const { error } = statusValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};
export default statusValidation;
