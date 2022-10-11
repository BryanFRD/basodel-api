const DB = require('../database/db');
const jwt = require('jsonwebtoken');
const RoleModel = require('../models/Role.model');
const UserAccountModel = require('../models/UserAccount.model');
const UserCredentialModel = require('../models/UserCredential.model');
const BaseService = require('./BaseService.service');

class ConfirmationService extends BaseService {
  
  create = async (model, req, res) => {
    jwt.verify(req.searchParams.token, process.env.EMAIL_TOKEN, async (err, uc) => {
      if(err)
        return super.handleResponse(res, {statusCode: 400});
      
      delete uc.iat;
      delete uc.exp;
      
      const transaction = await DB.transaction();
      UserCredentialModel.create(uc,
        {
          transaction: transaction,
          include: [UserAccountModel]
        }
      )
      .then(value => {
        transaction.commit();
        
        super.handleResponse(res, {statusCode: 200});
      })
      .catch(error => {
        if(transaction.finished !== 'commit')
        transaction.rollback();
        
        super.handleResponse(res, {statusCode: 200});
      });
    });
  }
  
  update = async (model, req, res) => {
    res.sendStatus(400);dfcv
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