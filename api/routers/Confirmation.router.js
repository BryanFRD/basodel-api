const BaseRouter = require('./BaseRouter.router');

class Confirmation extends BaseRouter {
  
  constructor(){
    super({read: true});
    
    this.initializeRoutes();
  }
  
  initializeRoutes = () => {
    this.router.get('/:token', async (req, res) => {
      return this.controller.selectWithToken(req, res);
    })
  }
  
}

module.exports = Confirmation;