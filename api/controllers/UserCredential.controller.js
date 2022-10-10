const BaseController = require('./BaseController.controller');

class UserCredentialController extends BaseController {
  
  constructor(){
    super(['user_account'])
  }
  
}

module.exports = UserCredentialController;