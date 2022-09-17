const Joi = require("joi");
const Logger = require("../helpers/Logger.helper");

class BaseValidator {
  
  
  
  validateCreate = async (model) => {
    let schema = this.schemaCreatse;
    console.log('schema:', schema);
    
    
    
    if(!schema){
      schema = Joi.object();
      
      Logger.warn(`Using default schema`);
    }
    
    return await this.schemaCreate.validateAsync(model, {
      stripUnknown: true,
    });
  }
  
}

module.exports = BaseValidator;