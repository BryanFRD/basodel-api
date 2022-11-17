const BaseService = require('./BaseService.service');
const { Op } = require('sequelize');
const RoleModel = require('../models/Role.model');
const UserAccountModel = require('../models/UserAccount.model');
const UserCredentialModel = require('../models/UserCredential.model');
const jwt = require('jsonwebtoken');

class AuthService extends BaseService {
  
  // CREATE
  create = async (model, req, res) => {
    const userCredential = await UserCredentialModel.findOne({
      where: {
        [Op.or]: [
          {email: req.body.model.email},
          {login: req.body.model.login}
        ]
      },
      include: [
        UserAccountModel,
        {model: UserAccountModel, include: [RoleModel, UserAccountModel.associations.blockedUser, UserAccountModel.associations.articles]}
      ]
    });
    
    if(!userCredential || userCredential.isDeleted)
      return res.status(404).send({error: 'error.auth.create.notFound'});
      
    const isAuthenticated = await userCredential.authenticate(req.body.model.password);
    
    if(!isAuthenticated)
      return res.status(401).send({error: 'error.auth.create.authentication'});
    
    const uc = userCredential.toJSON();
    
    const authToken = generateAuthToken({
      id: uc.id,
      updatedAt: Date.parse(uc.updatedAt)
    });
    
    const accessToken = generateAccessToken({
      ucId: uc.id,
      id: uc.user_account.id,
      role: uc.user_account.role
    });
    
    return res.status(200).send({
      authToken: authToken.token,
      accessToken: accessToken.token,
      authTokenExpires: authToken.expires,
      accessTokenExpires: accessToken.expires,
      model: uc
    });
  }
  
  // READ
  select = async (model, req, res) => {
    const auth = req?.headers['authorization'];
    const token = auth?.split(' ')[1];
    
    if(!token)
      return res.sendStatus(401);
      
    jwt.verify(token, process.env.AUTH_TOKEN, (err, user) => {
      if(err)
        return res.sendStatus(401);
      
      UserCredentialModel.findByPk(user.id,
        {include: [
          UserAccountModel,
          {model: UserAccountModel, include: [RoleModel, UserAccountModel.associations.blockedUser, UserAccountModel.associations.articles]}
        ]})
        .then(value => {
          const uc = value.toJSON();
          
          if(!uc || uc.isDeleted)
            return res.status(401).send({error: 'error.auth.get.notFound'});
          
          if(user.updatedAt !== Date.parse(uc.updatedAt))
            return res.sendStatus(401);
          
          const authToken = generateAuthToken({
            id: uc.id,
            updatedAt: Date.parse(uc.updatedAt)
          });
          
          const accessToken = generateAccessToken({
            ucId: uc.id,
            id: uc.user_account.id,
            role: uc.user_account.role?.level
          });
          
          res.status(200).send({
            authToken: authToken.token,
            accessToken: accessToken.token,
            authTokenExpires: authToken.expires,
            accessTokenExpires: accessToken.expires,
            model: uc
          });
        })
        .catch(error => res.status(404).send({error}));
      });
  }
  
}

module.exports = AuthService;