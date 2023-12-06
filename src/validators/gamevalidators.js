const Joi = require('joi');

const gameValidationSchema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().required(),
  compatiblePlatform: Joi.string().required(),
  gameModes: Joi.string().required(),
  language: Joi.string().required(),
  price: Joi.number().integer().required()
  
});

function validateGame(game) {
  return gameValidationSchema.validate(game);
}

module.exports = { validateGame };