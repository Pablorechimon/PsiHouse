const { login } = require('../controllers/usuarioController');

const router = require('express').Router();
usuarioController = require('../controllers/usuarioController')

router.route('/register')
    .post(usuarioController.create)
router.route('/login')
    .post(usuarioController.login)

module.exports = router