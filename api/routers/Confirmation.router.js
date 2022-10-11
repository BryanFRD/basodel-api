const BaseRouter = require('./BaseRouter.router');

class ConfirmationRouter extends BaseRouter {
  
  constructor(){
    super({create: false, read: false});
  }
  
}

module.exports = ConfirmationRouter;