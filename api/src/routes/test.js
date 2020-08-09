const express = require('express');
const router = express.Router();
const testControllers = require('../controllers/test')

router.get('/:prenom', testControllers.Display);

module.exports = router;
