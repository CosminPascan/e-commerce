const { validationResult } = require('express-validator')

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0]
        return res.status(400).send({ message: error.msg })
    }
    next()
}

module.exports = validate
