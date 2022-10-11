const Joi = require("joi");
const BaseValidator = require("./BaseValidator.validator");

class ConfirmationValidator extends BaseValidator {
  
  // static #loginOrEmailAlternatives = Joi.alternatives(
  //   Joi.string().email(),
  //   Joi.string().min(5).max(50).alphanum()
  // ).required();
  
  // static schemaUpdate = Joi.object({
  //   login: this.#loginOrEmailAlternatives,
  //   email: this.#loginOrEmailAlternatives
  // });
  
}

module.exports = ConfirmationValidator;