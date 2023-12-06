const Joi = require('joi');

const usuarioValidationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

function validateUsuario(usuario) {
    return usuarioValidationSchema.validate(usuario);
}

module.exports = { validateUsuario };