const Joi = require('joi');

const ChatMessage = (value) => {
  const schema = Joi.object({
    message: Joi.string().max(255).trim().required(),
    user_account: Joi.object().keys({
      id: Joi.string().length(36).trim().required()
    }).required()
  });
  
  return schema.validate(value);
}

module.exports = ChatMessage;