const router = require('express').Router();
const notasController = require('../controllers/notasController')

router.route('/:id/notas')
    .get(notasController.get)
router.route('/:id/notas')
    .post(notasController.create)
router.route('/:id/notas')
    .patch(notasController.editNota)

module.exports = router