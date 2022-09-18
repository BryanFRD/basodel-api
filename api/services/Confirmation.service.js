const jwt = require('jsonwebtoken');
const BaseService = require('./BaseService.service');

class Confirmation extends BaseService {
  
  selectWithToken = async (req, res) => {
    const token = req?.params?.token;
    
    jwt.verify(token, process.env.EMAIL_TOKEN, (err, email) => {
      
    })
    
    res.sendStatus(400)
  }
  
  // OVERIDES
  
  create = async (model, req, res) => {
    res.sendStatus(400);
  }
  
  select = async (model, req, res) => {
    res.sendStatus(400);
  }
  
  update = async (model, req, res) => {
    res.sendStatus(400);
  }
  
  delete = async (model, req, res) => {
    res.sendStatus(400);
  }
  
}

module.exports = Confirmation;