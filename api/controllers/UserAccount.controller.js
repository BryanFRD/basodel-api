const BaseController = require('./BaseController.controller');

class UserAccountController extends BaseController {
  
  constructor(){
    super(['role']);
  }
  
}

module.exports = UserAccountController;