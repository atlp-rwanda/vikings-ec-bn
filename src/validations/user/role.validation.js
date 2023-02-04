import Joi from 'joi';

const validateRole = async (req, res, next) => {
  const roleSchema= Joi.object({
    role: Joi.string()
      .valid('admin', 'seller', 'buyer')
      .required(),
  });
  const { error } = roleSchema.validate(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '') }); 
  } 
  next();
};

export default validateRole;