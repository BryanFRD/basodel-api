const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const auth = req?.headers['authorization'];
  const token = auth?.split(' ')[1];
  
  if(!token)
    return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if(err)
      return res.sendStatus(401);
    
    req.user = user;
    console.log(user);
    next();
  });
}

module.exports = authenticateToken;