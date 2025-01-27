const express = require('express')
const router = express.Router()
const orderService = require('./orderService')
const verifyToken = require('../middlewares/verifyToken')

router.get('/orders/:userId', verifyToken, orderService.getOrdersByUserId)
router.post('/orders', verifyToken, orderService.postOrder)

module.exports = router
