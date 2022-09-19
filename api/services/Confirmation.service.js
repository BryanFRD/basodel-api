const jwt = require('jsonwebtoken');
const UserCredential = require('../models/UserCredential.model');
const BaseService = require('./BaseService.service');

class Confirmation extends BaseService {
  
  selectWithToken = async (req, res) => {
    await jwt.verify(req.params.token, process.env.EMAIL_TOKEN, async (err, email) => {
      if(err)
        return;
      
      await UserCredential.update({emailConfirmed: true}, {where: {id: email.id}});
      
      res.redirect(`${process.env.APP_URL}confirmation?confirmed=true`);
    });
    
    res.redirect(`${process.env.APP_URL}confirmation?confirmed=false`);
  }
  
  select = async (model, req, res) => {
    const code = await jwt.verify(req.params.token, process.env.EMAIL_TOKEN, async (err, email) => {
      if(err)
        return 400;
      
      await UserCredential.findByPk(email.id);
      
      return 200;
    });
    
    res.sendStatus(result ?? 400);
  }
  
  // OVERIDES
  
  create = async (model, req, res) => {
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