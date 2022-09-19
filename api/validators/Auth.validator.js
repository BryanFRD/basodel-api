const Joi = require("joi");
const BaseValidator = require("./BaseValidator.validator");

class Auth extends BaseValidator {
  
  //TODO Trouver une meilleurs solution
  static #loginOrEmailAlternatives = Joi.alternatives(
    Joi.string().email(),
    Joi.string().min(5).max(50).alphanum()
  ).required();
  
  static schemaCreate = Joi.object({
    login: this.#loginOrEmailAlternatives,
    email: this.#loginOrEmailAlternatives
  });
  
}

module.exports = Auth;