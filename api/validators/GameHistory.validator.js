const Joi = require('joi');

const GameHistory_UserAccount = (value) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(16).trim().required(),
  });
  
  return schema.validate(value);
}

module.exports = GameHistory_UserAccount;