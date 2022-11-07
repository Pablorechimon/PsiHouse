const router = require('express').Router();
const tareaController = require('../controllers/tareaController')

router.route('/usuario/:id')
    .get(tareaController.get)
router.route('/')
    .post(tareaController.create)
router.route('/')
    .patch(tareaController.editTask)

module.exports = router