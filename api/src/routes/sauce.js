const express = require('express')
const router = express.Router()
const sauceControllers = require('../controllers/sauce')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


router.get('/', auth, sauceControllers.getAllSauces)
router.post('/', auth, multer, sauceControllers.addSauce)

router.get('/:id', auth, sauceControllers.getSauce)
router.put('/:id', auth, multer, sauceControllers.updateSauce)
router.delete('/:id', auth, sauceControllers.deleteSauce)

router.post('/:id/like', auth, sauceControllers.handleLike)

module.exports = router
