const BaseService = require('./BaseService.service');

class UserAccount extends BaseService {
  
  insert = async (model, validate, params) => {
    return {statusCode: 405, content: "You must use 'user' request, in order to create an account with its credential!"};
  }
  
}

module.exports = UserAccount;