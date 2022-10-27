const Joi = require("joi");
const Logger = require("../helpers/Logger.helper");
const validators = require('./');

class BaseValidator {
  
  static #defaultSchema = Joi.any();
  
  validateCreate = (model) => {
    let schema = validators[this.constructor.name].schemaCreate;
    const useDefaultSchema = !schema;
    
    if(useDefaultSchema){
      schema = BaseValidator.#defaultSchema;
      
      Logger.warn(`Using default CREATE schema (${this.constructor.name.replace('Validator', '')})`);
    }
    
    return schema.validate(model, {
      stripUnknown: !useDefaultSchema
    });
  }
  
  validateSelect = (model) => {
    let schema = validators[this.constructor.name].schemaSelect;
    const useDefaultSchema = !schema;
    
    if(useDefaultSchema){
      schema = BaseValidator.#defaultSchema;
      
      Logger.warn(`Using default GET schema (${this.constructor.name.replace('Validator', '')})`);
    }
    
    return {schema: schema.validate(model, {
      stripUnknown: !useDefaultSchema,
    }), }
  }
  
  validateUpdate = (model) => {
    let schema = validators[this.constructor.name].schemaUpdate;
    const useDefaultSchema = !schema;
    
    if(useDefaultSchema){
      schema = BaseValidator.#defaultSchema;
      
      Logger.warn(`Using default UPDATE schema (${this.constructor.name.replace('Validator', '')})`);
    }
    
    return schema.validate(model, {
      stripUnknown: !useDefaultSchema,
    });
  }
  
  validateDelete = (model) => {
    let schema = validators[this.constructor.name].schemaDelete;
    const useDefaultSchema = !schema;
    
    if(useDefaultSchema){
      schema = BaseValidator.#defaultSchema;
      
      Logger.warn(`Using default DELETE schema (${this.constructor.name.replace('Validator', '')})`);
    }
    
    return schema.validate(model, {
      stripUnknown: !useDefaultSchema,
    });
  }
  
}

module.exports = BaseValidator;