const joi = require('joi');

const idSchema = joi.number().integer().min(1).required(); 

module.exports = {
  idSchema,
};