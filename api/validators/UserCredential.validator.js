const Joi = require("joi");
const BaseValidator = require('./BaseValidator.validator');
const UserAccount = require("./UserAccount.validator");

class UserCredentialValidator extends BaseValidator {
  
  static schemaCreate =
     Joi.object({
      email: Joi.string().email({tlds: {allow: false}}).required(),
      login: Joi.string().min(5).max(50).alphanum().required(),
      password: Joi.string().pattern(
        new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,50}$/))
        .required(),
      user_account: UserAccount.schemaCreate
    }).required();
  
}

module.exports = UserCredentialValidator;