const router = require('express').Router();
const pagoController = require('../controllers/pagoController')

router.route('/')
    .get(pagoController.get)

module.exports = router