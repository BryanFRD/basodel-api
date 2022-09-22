const BaseRouter = require('./BaseRouter.router');

class UserCredentialRouter extends BaseRouter {
  
  constructor(){
    super({create: false});
  }
  
}

module.exports = UserCredentialRouter;