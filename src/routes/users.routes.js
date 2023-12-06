const express = require('express');
const authRouter = express.Router();
const { models } = require('../libs/sequelize');
const passport = require('passport');
const { validateUsuario } = require('../validators/usersvalidators');

authRouter.route('/signup')
  .get((req, res) => {
    res.render('auth/signup');
  })
  .post(async (req, res) => {
    try {
      // Validar los datos del formulario
      const { error } = validateUsuario(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      // Crear usuario en BD
      const user = await models.User.create(req.body);

      // Autenticar al usuario
      req.login(user, (err) => {
        if (err) {
          throw err;  
        }
        res.redirect('/games');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error durante el registro. Por favor, inténtalo de nuevo.');
    }
  });

  authRouter.route('/signin')
  .get((req, res) => {
    res.render('auth/signin');
  })
  .post(
    passport.authenticate('local', {
      successRedirect: '/games',  // Redirige a /games en caso de autenticación exitosa
      failureRedirect: '/auth/signin',
      keepSessionAlive: true
    })
  );

module.exports = authRouter;
