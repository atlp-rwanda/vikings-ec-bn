import Joi from 'joi';

const validateStatus = async (req, res, next) => {
  const statusSchema= Joi.object().keys({
    isActive: Joi.boolean().required(),
  });
  const { error } = statusSchema.validate(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '') }); 
  } 
  next();
};

export default validateStatus;