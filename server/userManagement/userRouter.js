const express = require('express')
const router = express.Router()
const userService = require('./userService')
const { registerValidationRules, loginValidationRules } = require('../validators/userValidator')
const validate = require('../middlewares/validate')
const verifyToken = require('../middlewares/verifyToken')

router.get('/users', userService.getAllUsers)
router.post('/register', registerValidationRules, validate, userService.registerUser)
router.post('/login', loginValidationRules, validate, userService.loginUser)

router.get('/resurse', verifyToken, (req, res) => {
    console.log(req.user)
    const data = [
        {
            nume: 'Ioana',
            prenume: 'Maria'
        },
        {
            nume: 'Mihai',
            prenume: 'Mario'
        },
        {
            nume: 'Ioana',
            prenume: 'Maria'
        }
    ]
    res.status(200).json(data)
})

module.exports = router
