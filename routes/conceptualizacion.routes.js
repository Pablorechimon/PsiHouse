const router = require('express').Router();
const conceptualizacionController = require('../controllers/conceptualizacionController')

router.route('/:id/conceptualizaciones')
    .get(conceptualizacionController.get)
router.route('/:id/conceptualizaciones')
    .post(conceptualizacionController.create)
router.route('/:id/conceptualizaciones')
    .patch(conceptualizacionController.editConceptualizacion)

module.exports = router