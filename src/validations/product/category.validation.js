import Joi from 'joi';

const categoryValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
});
const categoryValidation = async (req, res, next) => {
  const {error} = categoryValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  } else {
    next();
  }
};

export default categoryValidation;
