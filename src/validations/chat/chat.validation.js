import Joi from 'joi';

const validateChatMessage = async (req, res, next) => {
  const messageSchema = Joi.object().keys({
    message: Joi.string().required(),
  });

  const { error } = messageSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};

export default validateChatMessage;
