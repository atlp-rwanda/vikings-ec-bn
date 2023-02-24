import Joi from 'joi';

const validateEmail = async (req, res, next) => {
  const emailSchema = Joi.object().keys({
    email: Joi.string().required()
  });

  const { error } = emailSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};

export default validateEmail;