"use strict";

var express = require('express');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
var projectsRouter = require('./routes/projects'); // Ruta para proyectos
var usersRouter = require('./routes/users'); // Ruta para usuarios
var servicesRouter = require('./routes/services'); // Ruta para servicios
var productsRouter = require('./routes/products'); // Ruta para productos
var authRouter = require('./routes/auth'); // Ruta para autenticación

var app = express();
var PORT = process.env.PORT || 5000;

// Middleware para parsear JSON y datos URL-encoded
app.use(cors()); // Configura CORS si necesario para tu caso específico
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Middleware para verificar JWT
var authenticateJWT = function authenticateJWT(req, res, next) {
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: 'Acceso denegado. No token provided.'
    });
  }
  var token = authHeader.split(' ')[1];
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'Token inválido o expirado'
    });
  }
};

// Ruta raíz
app.get('/', function (req, res) {
  res.send('¡Bienvenido al servidor backend de Biodiversidad!');
});

// Rutas con autenticación JWT
app.use('/api/projects', authenticateJWT, projectsRouter);
app.use('/api/users', authenticateJWT, usersRouter);
app.use('/api/services', authenticateJWT, servicesRouter);
app.use('/api/products', authenticateJWT, productsRouter);
app.use('/api/auth', authRouter); // Ruta pública para autenticación

// Middleware de manejo de errores
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, function () {
  console.log("Servidor backend corriendo en http://localhost:".concat(PORT));
});