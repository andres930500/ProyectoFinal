const passport = require('passport');
const LocalStrategy = require('passport-local');

const {models} = require('../../libs/sequelize');

passport.use(new LocalStrategy({
    email: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    const user = await models.User.findOne({where: {email, password}});
    if(!user){
        return done(null, false, {message: 'Usuario o contraseña incorrectos'});
    } else {
        return done(null, user);
    }
}));