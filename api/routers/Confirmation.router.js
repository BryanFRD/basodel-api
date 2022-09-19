const BaseRouter = require('./BaseRouter.router');

class Confirmation extends BaseRouter {
  
  constructor(){
    super({read: false, update: false});
  }
  
}

module.exports = Confirmation;