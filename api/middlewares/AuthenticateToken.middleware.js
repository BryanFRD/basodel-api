const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const auth = req?.headers['authorization'];
  const token = auth?.split(' ')[1];
  
  if(!token)
    return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
    if(err)
      return res.sendStatus(401);
    
    req.user = user;
  });
  
  if(req.user)
    next();
  else res.sendStatus(401),
}

module.exports = authenticateToken;