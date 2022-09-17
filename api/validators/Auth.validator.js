const Joi = require("joi");
const BaseValidator = require("./BaseValidator.validator");

class UserCredential extends BaseValidator {
  
  schemaCreate = Joi.object({
    email: Joi.string().email(),
    login: Joi.string().min(5).max(50).alphanum(),
    password: Joi.string().pattern(
      new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/))
      .required()
    }).xor('email', 'login');
  
    
  //TODO replace min with the length of a token
  schemaGet = Joi.object({
    refreshToken: Joi.string().min(5).required()
  });
  
}

module.exports = UserCredential;