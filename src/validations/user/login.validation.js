import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

const validateLogin = async (req, res, next) => {
  const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: joiPassword
      .string()
      .required()
  });

  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};

export default validateLogin;
