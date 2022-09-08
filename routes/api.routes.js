const express = require('express');
const pacienteRoutes = require('./pacientes.routes')
// const usuarioRoutes = require('./usuario.routes')
// const historiaRoutes = require('./historia.routes')
// const notasRoutes = require('./notas.routes')
// const conceptualizacionRoutes = require('./conceptualizacion.routes')
// const tareaRoutes = require('./tarea.routes')
// const compartidoRoutes = require('./compartido.routes')

const app = express();

app.use('/pacientes', pacienteRoutes);
// app.use('/pacientes/:id/historia', historiaRoutes);
// app.use('/pacientes/:id/notas', notasRoutes);
// app.use('/pacientes/:id/conceptualizacion', conceptualizacionRoutes);
// app.use('/pacientes/:id/compartido', compartidoRoutes);

// app.use('/usuario', usuarioRoutes);
// app.use('/tarea', tareaRoutes);

// app.use('/compartido', courseRoutes);
// app.use('/pacientes', userRoutes);
// app.use('/pacientes/:id/historia', historyRoutes);
// app.use('/pacientes/:id/notas', progressRoutes);
// app.use('/pacientes/:id/conceptualizacion', progressRoutes);

module.exports = app;

