import Joi from 'joi';

const cartValidationSchema = Joi.object({
	productId: Joi.string().required(),
  productQuantity: Joi.number().min(1),
});
const cartValidation = async (req, res, next) => {
	const { error } = cartValidationSchema.validate(req.body, {
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

export default cartValidation;
