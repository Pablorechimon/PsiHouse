const router = require('express').Router();
const compartidoController = require('../controllers/compartidoController')

router.route('/:id/compartidos')
    .get(compartidoController.get)
router.route('/:id/compartidos')
    .post(compartidoController.create)
router.route('/:id/compartidos')
    .patch(compartidoController.editCompartido)

module.exports = router