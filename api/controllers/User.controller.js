const BaseController = require('./BaseController.controller');
const models = require('../models');
const validators = require('../validators');
const services = require('../services');

class User extends BaseController {
  
  constructor(){
    super();
    
    this.model = {
      UserCredential: models['UserCredential'],
      UserAccount: models['UserAccount']
    };
    
    this.validate = {
      UserCredential: validators['UserCredential'],
      UserAccount: validators['UserAccount']
    };
  }
  
}

module.exports = User;