const joi = require('joi');

const idSchema = joi.number().integer().min(1).required();

const addProductSchema = joi.string().min(5).required();

module.exports = {
  idSchema,
  addProductSchema,
};