const express = require('express')
const router = express.Router()
const sauceControllers = require('../controllers/sauce')
const auth = require('../middleware/auth')


router.get('/', auth, sauceControllers.getAllSauces)
router.get('/:id', auth, sauceControllers.getSauce)

router.post('/', auth, sauceControllers.addSauce)
router.put('/:id', auth, sauceControllers.updateSauce)
router.delete('/:id', auth, sauceControllers.deleteSauce)

router.post('/:id/like', auth, sauceControllers.handleLike)

module.exports = router
