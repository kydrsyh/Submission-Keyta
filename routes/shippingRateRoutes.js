// Import dependencies
const express = require('express')
const router = express.Router()

// Import controller and validator
const Controller = require('../controllers/shippingRateController')

router.get('/',  Controller.getRate)
router.get('/markup', Controller.markup)
router.get('/markup/selection', Controller.selection)

module.exports = router; // Export router
