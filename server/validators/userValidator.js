const { body } = require('express-validator')
const { checkEmailNotUsed } = require('../userManagement/userService')

const registerValidationRules = [
    body('email', 'Invalid email!').trim().isEmail().normalizeEmail().custom(checkEmailNotUsed),
    body('password', 'Password must be at least 8 characters long!').isLength({ min: 8 }).trim()
]

const loginValidationRules = [
    body('email', 'Invalid email!').trim().isEmail().normalizeEmail()
]

module.exports = {
    registerValidationRules,
    loginValidationRules
}
