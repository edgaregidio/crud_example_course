const express = require('express');
const courseController = require('./controller/courseControlle');
 
const routes = express.Router();

routes.get('/cursos', courseController.index);
routes.post('/cursos', courseController.create);
routes.get('/cursos/:id', courseController.read);

module.exports = routes;