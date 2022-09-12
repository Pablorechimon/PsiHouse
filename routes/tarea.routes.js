const router = require('express').Router();
const tareaController = require('../controllers/tareaController')

router.route('/')
    .get(tareaController.get)

module.exports = router