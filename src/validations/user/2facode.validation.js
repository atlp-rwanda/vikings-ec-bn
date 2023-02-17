import Joi from 'joi';


const validateAuthCode = async (req, res, next) => {
  const otpSchema = Joi.object().keys({
    authCode: Joi.string().required(),

  });

  const { error } = otpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};

export default validateAuthCode;
