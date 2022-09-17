const Joi = require("joi");
const BaseValidator = require('./BaseValidator.validator');
const UserAccount = require("./UserAccount.validator");

class UserCredential extends BaseValidator {
  
  static schemaCreate =
     Joi.object({
      email: Joi.string().email().required(),
      login: Joi.string().min(5).max(50).alphanum().required(),
      password: Joi.string().pattern(
        new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/))
        .required(),
      user_account: UserAccount.schemaCreate
    }).required();
  
}

module.exports = UserCredential;