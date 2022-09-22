const jwt = require('jsonwebtoken');
const Mailer = require('../helpers/Mailer.mail');
const Role = require('../models/Role.model');
const UserAccount = require('../models/UserAccount.model');
const UserCredential = require('../models/UserCredential.model');
const BaseService = require('./BaseService.service');

class ConfirmationService extends BaseService {
  
  
  create = async (model, req, res) => {
    const userCredential = await UserCredential.findOne({
      where: {
        [Op.or]: [
          {email: req.body.model.email},
          {login: req.body.model.login}
        ]
      },
      include: [
        UserAccount,
        {model: UserAccount, include: [Role]}
      ]
    });
    
    if(!userCredential && !userCredential.emailConfirmed)
    return res.status(400).send({error: userCredential ? 'error.confirmation.update.notFound' : 'error.confirmation.update.alreadyConfirmed'});
    
    const emailToken = generateEmailToken({id});
    
    Mailer.sendConfirmationEmail(`${process.env.APP_URL}/confirmation/${emailToken}`, userCredential.email);
    
    res.status(201).send({message: 'message.confirmation.update.sent'});
  }
  
  update = async (model, req, res) => {
    await jwt.verify(req.body.token, process.env.EMAIL_TOKEN, async (err, email) => {
      if(err)
        return res.sendStatus(400);
      
      const userCredential = await UserCredential.update({emailConfirmed: true}, {where: {id: email.id}});
      
      return res.sendStatus(200);
    });
  }
  
  // OVERIDES
  
  select = async (model, req, res) => {
    res.sendStatus(400);
  }
  
  delete = async (model, req, res) => {
    res.sendStatus(400);
  }
  
}

module.exports = ConfirmationService;