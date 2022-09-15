class BaseValidator {
  
  validateCreate = (model) => {
    return true;
  }
  
  validateRead = (model) => {
    return true
  }
  
  validateReadWithId = (model) => {
    return true;
  }
  
  validateUpdate = (model) => {
    return true;
  }
  
  validateUpdateWithId = (model) => {
    return true;
  }
  
  validateDelete = (model) => {
    return true;
  }
  
}

module.exports = BaseValidator;