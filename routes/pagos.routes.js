const router = require('express').Router();
const pagoController = require('../controllers/pagoController')

router.route('/usuario/:id')
    .get(pagoController.get)

module.exports = router