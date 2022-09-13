const BaseRouter = require('./BaseRouter.router');

class UserCredential extends BaseRouter {
  
  constructor(){
    super({create: false});
  }
  
}

module.exports = UserCredential;