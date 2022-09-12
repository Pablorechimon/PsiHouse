const router = require('express').Router();
const compartidoController = require('../controllers/pacienteController')

router.route('/')
    .get(compartidoController.get)

module.exports = router