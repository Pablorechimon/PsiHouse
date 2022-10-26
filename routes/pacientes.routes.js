const router = require('express').Router();
const pacienteController = require('../controllers/pacienteController')
const pagoController = require('../controllers/pagoController')

router.route('/')
    .get(pacienteController.get)
router.route('/')
    .post(pacienteController.create)
router.route('/:id')
    .patch(pacienteController.editPaciente)
router.route('/:id')
    .get(pacienteController.getPaciente)
router.route('/:id/pagos')
    .get(pagoController.getPagosPaciente)
router.route('/:id/pagos')
    .post(pagoController.create)
router.route('/:id/pagos')
    .patch(pagoController.editPago)

module.exports = router