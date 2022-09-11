const Joi = require('joi');

const GameHistory_UserAccount = (value) => {
  const schema = Joi.object({
    title: Joi.string().max(50).trim().required(),
    information: Joi.string().max(255).trim().required(),
    user_account: Joi.object().keys({
      id: Joi.string().length(36).trim().required()
    }).required()
  });
  
  return schema.validate(value);
}

module.exports = GameHistory_UserAccount;