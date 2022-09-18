const BaseRouter = require('./BaseRouter.router');

class Confirmation extends BaseRouter {
  
  constructor(){
    super({read: false});
  }
  
}

module.exports = Confirmation;