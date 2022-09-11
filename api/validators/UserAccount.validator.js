const Joi = require('joi');

const UserAccountValidator = (value) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(16).trim().required(),
    user_account: Joi.object().keys({
      id: Joi.string().length(36).trim().required()
    }).required()
  });
  
  return schema.validate(value);
}

module.exports = UserAccountValidator;