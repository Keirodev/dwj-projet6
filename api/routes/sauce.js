const express = require('express')
const router = express.Router()
const sauceControllers = require('../controllers/sauce')

router.get('/', sauceControllers.getRoot)
router.post('/', sauceControllers.postRoot)

module.exports = router
