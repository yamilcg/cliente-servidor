const express = require('express');
const { getAllTypes, getTypeByID, addType, updateType, deleteType } = require('../controllers/type');

const typeRouter = express.Router();

// Ruta para obtener todos los tipos
typeRouter.get('/', getAllTypes);

// Ruta para obtener un tipo por ID
typeRouter.get('/:id', getTypeByID);

// Ruta para agregar un nuevo tipo
typeRouter.post('/', addType);

// Ruta para actualizar un tipo existente
typeRouter.put('/:id', updateType);

// Ruta para eliminar un tipo
typeRouter.delete('/:id', deleteType);

module.exports = { typeRouter };

