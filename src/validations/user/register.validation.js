import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

const validateRegister = async (req, res, next) => {
  const registerSchema = Joi.object().keys({
    firstname: Joi.string().min(3).trim().required(),
    lastname: Joi.string().min(3).trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    phone: Joi.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im),
    password: joiPassword
      .string()
      .min(8)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .required()
      .trim(),
  });

  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};

export default validateRegister;
