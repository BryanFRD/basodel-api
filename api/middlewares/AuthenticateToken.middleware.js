const jwt = require('jsonwebtoken');
const UserAccountModel = require('../models/UserAccount.model');

const authenticateToken = (req, res, next) => {
  const auth = req?.headers['authorization'];
  const token = auth?.split(' ')[1];
  
  if(!token)
    return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if(err)
      return res.sendStatus(401);
    
    return await UserAccountModel.findByPk(user.id)
      .then(ua => {
        const json = ua.toJSON();
        
        if(user.updatedAt !== Date.parse(json.updatedAt) || json.isDeleted)
          return res.sendStatus(401);
          
        req.user = json;
        return next();
      })
      .catch(err => res.sendStatus(401));
  });
}

module.exports = authenticateToken;