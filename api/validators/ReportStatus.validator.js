const Joi = require('joi');

const ReportStatus = (value) => {
  const schema = Joi.object({
    title: Joi.string().max(50).trim().required(),
  });
  
  return schema.validate(value);
}

module.exports = ReportStatus;