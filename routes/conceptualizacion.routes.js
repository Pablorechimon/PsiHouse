const router = require('express').Router();
const conceptualizacionController = require('../controllers/conceptualizacionController')

router.route('/')
    .get(conceptualizacionController.get)

module.exports = router