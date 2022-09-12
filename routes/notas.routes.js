const router = require('express').Router();
const notasController = require('../controllers/notasController')

router.route('/')
    .get(notasController.get)

module.exports = router