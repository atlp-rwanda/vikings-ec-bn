import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

const validateNewPassword = async (req, res, next) => {
    const passwordSchema = Joi.object().keys({
      newPassword: joiPassword
        .string()
        .min(8)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required()
        .trim(),
    });
  
    const { error } = passwordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
    }
    next();
  };
  
  export default validateNewPassword;