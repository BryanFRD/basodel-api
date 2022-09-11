const Joi = require('joi');

const Report = (value) => {
  const schema = Joi.object({
    reportedUserId: Joi.string().min(36).max(36).trim().required(),
    title: Joi.string().max(50).trim().require(),
    content: Joi.string().max(255).trim().required(),
    origin: Joi.string().max(255).trim().required(),
    report_status: Joi.object().keys({
      id: Joi.number().required()
    }).required()
  });
  
  return schema.validate(value);
}

module.exports = Report;