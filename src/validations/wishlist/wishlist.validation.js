import Joi from "joi";

const wishlistValidationSchema = Joi.object({
  productId: Joi.string().required(),
});
const wishlistValidation = async (req, res, next) => {
  const { error } = wishlistValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
    });
  } else {
    next();
  }
};

export default wishlistValidation;
