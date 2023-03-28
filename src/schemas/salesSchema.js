const Joi = require('joi');

const salesSchema = Joi.array().items(Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity: Joi.number().min(1).required().label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
  'any.min': '{{#label}} must be greater than or equal to 1',
}));

module.exports = salesSchema;