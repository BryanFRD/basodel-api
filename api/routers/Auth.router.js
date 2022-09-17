const BaseRouter = require('./BaseRouter.router');

class Auth extends BaseRouter {
  
  constructor(){
    super({create: false, read: false});
  }
  
}

module.exports = Auth;