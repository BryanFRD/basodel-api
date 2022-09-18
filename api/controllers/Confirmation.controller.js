const BaseController = require("./BaseController.controller");

class Confirmation extends BaseController {
  
  selectWithToken = async (req, res) => {
    return await this.service.selectWithToken(req, res);
  }
  
}

module.exports = Confirmation;