"use strict";

// backend/app.js

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var authRouter = require('./routes/auth'); // Importa las rutas de autenticación
var pageRouter = require('./routes/pages'); // Importa las rutas de páginas
var projectRouter = require('./Routes/projects'); // Importa las rutas de proyectos
var db = require('./database/bd'); // Importa el archivo de configuración de PostgreSQL

var app = express();
var PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite peticiones desde el frontend
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Rutas
app.use('/api/auth', authRouter); // Rutas de autenticación en /api/auth
app.use('/api/pages', pageRouter); // Rutas para manejar páginas en /api/pages
app.use('/api/projects', projectRouter); // Rutas para proyectos en /api/projects

// Iniciar servidor
app.listen(PORT, function () {
  console.log("Servidor backend corriendo en http://localhost:".concat(PORT));
});
module.exports = app;