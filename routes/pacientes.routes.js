const router = require('express').Router();
const pacienteController = require('../controllers/pacienteController')

router.route('/')
    .get(pacienteController.get)

module.exports = router