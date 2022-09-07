const Joi = require('joi');

const UserCredentialValidator = (value) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).trim().required(),
    login: Joi.string().min(5).max(50).trim().required(),
    password: Joi.string().min(5).trim().required()
  });
  
  return schema.validate(value);
}

module.exports = UserCredentialValidator;