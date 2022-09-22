const BaseRouter = require('./BaseRouter.router');

class AuthRouter extends BaseRouter {
  
  constructor(){
    super({create: false, read: false});
  }
  
}

module.exports = AuthRouter;