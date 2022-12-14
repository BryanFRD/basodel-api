const Joi = require("joi");
const BaseValidator = require("./BaseValidator.validator");

class UserAccountValidator extends BaseValidator {
  
  static schemaCreate = Joi.object({
    username: Joi.string().min(5).max(12).alphanum().required()
  }).required();
  
}

module.exports = UserAccountValidator;