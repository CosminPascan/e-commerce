const express = require('express')
const router = express.Router()
const userService = require('./userService')
const { registerValidationRules, loginValidationRules } = require('../validators/userValidator')
const validate = require('../middlewares/validate')

router.get('/users', userService.getAllUsers)
router.post('/register', registerValidationRules, validate, userService.registerUser)
router.post('/login', loginValidationRules, validate, userService.loginUser)

module.exports = router
