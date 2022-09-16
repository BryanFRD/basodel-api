const Joi = require("joi");

class UserCredential {
  
  validateCreation = (model) => {
    const schema = Joi.object({
      email: Joi.string().email().strict().required(),
      login: Joi.string().min(5).max(50).alphanum().required(),
      password: Joi.string().pattern(
        new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/))
        .required(),
      user_account: Joi.object().keys({
        username: Joi.string().min(5).max(50).alphanum().required()
      }).required()
    });
    
    return schema.validate(model);
  }
  
}

module.exports = UserCredential;