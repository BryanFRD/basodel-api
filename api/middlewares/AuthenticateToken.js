const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const auth = req?.headers['authorization'];
  const token = auth?.split(' ')[1];
  
  if(!token)
    return res.sendStatus(418);
  
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if(err)
      return res.sendStatus(418);
    
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;