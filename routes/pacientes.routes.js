const router = require('express').Router();
const pacienteController = require('../controllers/pacienteController')
const notasController = require('../controllers/notasController')
const historiaController = require('../controllers/historiaController')
const conceptualizacionController = require('../controllers/conceptualizacionController')
const compartidoController = require('../controllers/compartidoController')
// const historiaRoutes = require('./historia.routes')
// const notasRoutes = require('./notas.routes')
// const conceptualizacionRoutes = require('./conceptualizacion.routes')
// const compartidoRoutes = require('./compartido.routes')


router.route('/')
    .get(pacienteController.get)
router.route('/:id')
    .get(pacienteController.getPaciente)

router.route('/:id/notas')
    .get(notasController.get)
router.route('/:id/notas')
    .post(notasController.create)
router.route('/:id/notas')
    .patch(notasController.editNota)
    
router.route('/:id/historias')
    .get(historiaController.get)
router.route('/:id/historias')
    .post(historiaController.create)
router.route('/:id/historias')
    .patch(historiaController.editHistoria)
    
router.route('/:id/conceptualizaciones')
    .get(conceptualizacionController.get)
router.route('/:id/conceptualizaciones')
    .post(conceptualizacionController.create)
router.route('/:id/conceptualizaciones')
    .patch(conceptualizacionController.editConceptualizacion)

router.route('/:id/compartidos')
    .get(compartidoController.get)
router.route('/:id/compartidos')
    .post(compartidoController.create)
router.route('/:id/compartidos')
    .patch(compartidoController.editCompartido)


// app.use('/pacientes/:id/notas', notasRoutes);
// app.use('/pacientes/:id/historia', historiaRoutes);

// app.use('/pacientes/:id/conceptualizacion', conceptualizacionRoutes);
// app.use('/pacientes/:id/compartido', compartidoRoutes);
module.exports = router