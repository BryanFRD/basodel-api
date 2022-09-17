const Joi = require("joi");

class UserCredential {
  
  validateCreate = (model) => {
    const schema = Joi.object({
      email: Joi.string().email().strict(),
      login: Joi.string().min(5).max(50).alphanum(),
      password: Joi.string().pattern(
        new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/))
        .required()
      }).xor('email', 'login');
    
    return schema.validate(model);
  }
  
  validateGet = (model) => {
    const schema = Joi.object({
      refreshToken: Joi.string().required()
    });
    
    return schema.validate(model);
  }
  
}

module.exports = UserCredential;