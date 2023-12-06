const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = express.Router();
const { models } = require('../libs/sequelize');
const Joi = require('joi');
const { validateGame } = require('../validators/gamevalidators');
const { validateOrder } = require('../validators/ordersvalidator')


// Ruta principal (sin necesidad de inicio de sesión)
router.get('/', async (req, res) => {
    try {
        const games = await models.game.findAll();
        res.render('games/indexUser', { games });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la lista de juegos.' });
    }
});
router.get('/logout', (req, res) => {
    // Lógica para cerrar sesión
    req.logout();  // Este método depende de la estrategia de autenticación que estés utilizando
    res.redirect('/games');  // Redirige a la página principal o a donde prefieras
  });

router.get('/shopping-cart', (req, res) => {
    // Obtener productos seleccionados previamente (puedes almacenarlos en sesión)
    const selectedProducts = req.session.selectedProducts || [];

    
    res.render('store/shopping-cart', { selectedProducts });
});

// Ruta para manejar la solicitud de realizar un pedido
// router.js

// Ruta para manejar el envío del formulario de pedido
router.post('/place-order', async (req, res) => {
    try {
        // Validar los datos del formulario con Joi
        const { error } = validateOrder(req.body);

        // Si hay un error en la validación, devuelve un mensaje de error
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Obtener datos del formulario
        const { document, name, lastName, address, phone } = req.body;
        const productos = req.session.selectedProducts || [];

        // Calcular el total de la compra
        const total = productos.reduce((acc, product) => acc + product.price, 0);

        // Imprimir los datos obtenidos (puedes comentar o eliminar esta línea en producción)
        console.log('Datos obtenidos:', { document, name, lastName, address, phone, total, productos });

        // Crear un nuevo pedido en la base de datos
        const newPedido = await models.Pedido.create({
            document,
            name,
            lastName,
            address,
            phone,
            total,
            productos,
        });

        // Limpiar el carrito de compras en la sesión
        req.session.selectedProducts = [];

        // Redirigir o renderizar una página de confirmación
        res.redirect('/store');
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al realizar el pedido' });
    }
});




// Ruta para manejar la solicitud de añadir al carrito
router.post('/add-to-cart/:gameId', async (req, res) => {
    try {
        const gameId = req.params.gameId;
        // Lógica para obtener el producto por ID (puedes consultar tu base de datos)
        const game = await models.game.findByPk(gameId);

        // Añadir el producto al carrito
        req.session.selectedProducts = req.session.selectedProducts || [];
        req.session.selectedProducts.push({
            id: game.id,
            title: game.title,
            price: game.price,
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al añadir al carrito' });
    }
});

// Otras rutas...

module.exports = router;
