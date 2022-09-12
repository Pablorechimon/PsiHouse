const router = require('express').Router();
const historiaController = require('../controllers/historiaController')

router.route('/')
    .get(historiaController.get)

module.exports = router