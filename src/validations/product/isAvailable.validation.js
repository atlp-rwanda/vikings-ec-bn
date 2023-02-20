import Joi from 'joi';

const validateAvailable = async (req, res, next) => {
  const availableSchema= Joi.object({
    isAvailable: Joi.boolean()
      .valid(true,false)
      .required(),
  });
  const { error } = availableSchema.validate(req.body);
  if (error){
    return res.status(400).json({
       error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, '') }); 
  } 
  next();
};

export default validateAvailable;