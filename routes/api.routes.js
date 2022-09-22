const express = require('express');
const pacienteRoutes = require('./pacientes.routes')
const usuarioRoutes = require('./usuario.routes')
const tareaRoutes = require('./tarea.routes')
const notasRoutes = require('./notas.routes')
const historiaRoutes = require('./historia.routes')
const conceptualizacionRoutes = require('./conceptualizacion.routes')
const compartidoRoutes = require('./compartido.routes')
const pagosRoutes = require('./pagos.routes')

const app = express();

app.use('/pacientes', pacienteRoutes);
app.use('/pacientes', notasRoutes);
app.use('/pacientes', historiaRoutes);
app.use('/pacientes', conceptualizacionRoutes);
app.use('/pacientes', compartidoRoutes);

app.use('/pagos', pagosRoutes);

app.use('/usuario', usuarioRoutes);

app.use('/tareas', tareaRoutes);


module.exports = app;

