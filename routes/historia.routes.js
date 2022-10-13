const router = require('express').Router();
const historiaController = require('../controllers/historiaController')

router.route('/:id/historias')
    .get(historiaController.get)
router.route('/:id/historias')
    .post(historiaController.create)
router.route('/:id/historias')
    .patch(historiaController.editHistoria)

module.exports = router