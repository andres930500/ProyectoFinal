// Librerías externas
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Necesitas incluir la librería 'path' para manipular rutas de archivos



// Módulos internos
const { readFile } = require('./src/files');
const gamesRouter = require('./src/routes/games');
const authRouter = require('./src/routes/users.routes');
const storeRouter = require('./src/routes/store');  

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My App';
const FILE_NAME = './db/books.txt';

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'ingenieria informatica', resave: true, saveUninitialized: true }));
require('./src/config/passport')(app);

// Usar el motor de plantillas de EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});



// Rutas

app.use('/games', gamesRouter);
app.use('/auth', authRouter);
app.use('/store', storeRouter);  // Agregamos la ruta store
app.use('/static', express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`${APP_NAME} is running on http://localhost:${PORT}`);
});
