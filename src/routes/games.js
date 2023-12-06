// games.routes.js
const express = require('express');
const router = express.Router();
const { models } = require('../libs/sequelize');
const { validateGame } = require('../validators/gamevalidators');

// Middleware para verificar si el usuario está autenticado
router.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/signin');
    }
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      // Realiza cualquier acción adicional después del cierre de sesión
      res.redirect('/games/indexUser'); // o a la página que desees
    });
  });

// Ruta principal
router.get('/', async (req, res) => {
    console.log(req.user);
    const { search } = req.query;
    
    try {
        let games = await models.game.findAll();
        res.render('games/index', { games: games, search: search });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al obtener los juegos' });
    }
});

router.post('/', async (req, res) => {
    const { title, genre, compatiblePlatform, gameModes, language, price } = req.body;
    
    // Validar los datos usando Joi
    const gameData = { title, genre, compatiblePlatform, gameModes, language, price };
    const { error } = validateGame(gameData);
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message});
    }

    try {
        const newGame = await models.game.create(req.body);
        res.redirect('/games');
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al almacenar el juego' });
    }
});

// Crear juego
router.get('/create', (req, res) => {
    // Mostrar el formulario
    res.render('games/create');
});

router.post('/', async (req, res) => {
    try {
      // Validar el cuerpo de la solicitud con Joi
      const { error } = validateGame(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      // Crear el nuevo juego si la validación pasa
      const newGame = await models.GameModel.create(req.body);
      res.redirect('/games');
    } catch (error) {
      console.error(error);
      res.json({ message: 'Error al almacenar el juego' });
    }
  });

// Editar juego (mostrar formulario de edición)
router.get('/edit/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const game = await models.game.findByPk(gameId);
        res.render('games/edit', { game });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al cargar el formulario de edición' });
    }
});

// Actualizar juego (manipular el formulario de edición)
router.post('/edit/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const updatedGame = await models.game.update(req.body, { where: { id: gameId } });
        res.redirect('/games');
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al actualizar el juego' });
    }
});

// Eliminar un juego
router.post('/delete/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        await models.game.destroy({
            where: {
                id: gameId
            }
        });
        res.redirect('/games');
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al eliminar el juego' });
    }
});


// Ruta para visualizar los pedidos recibidos
router.get('/admin/orders', async (req, res) => {
    try {
        const orders = await models.Pedido.findAll(); // Obtener todos los pedidos desde la base de datos
        res.render('games/order', { orders });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al cargar los pedidos' });
    }
});



module.exports = router;
