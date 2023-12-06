const Joi = require('joi');

const pedidoSchema = Joi.object({
  id: Joi.number().integer(),
  document: Joi.string().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
 
});

function validateOrder(order) {
  return pedidoSchema.validate(order);
}

module.exports = { validateOrder };
