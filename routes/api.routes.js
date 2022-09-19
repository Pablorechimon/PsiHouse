const express = require('express');
const pacienteRoutes = require('./pacientes.routes')
const usuarioRoutes = require('./usuario.routes')
const tareaRoutes = require('./tarea.routes')

const app = express();

app.use('/pacientes', pacienteRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/tareas', tareaRoutes);

module.exports = app;

