const BaseRouter = require('./BaseRouter.router');

class ConfirmationRouter extends BaseRouter {
  
  constructor(){
    super({read: false, update: false});
  }
  
}

module.exports = ConfirmationRouter;