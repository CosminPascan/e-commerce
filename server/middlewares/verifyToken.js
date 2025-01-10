const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies['access-token']

    if (accessToken === undefined) return res.status(401).send({ message: 'No cookies!' })

    jwt.verify(accessToken, privateKey, (error, user) => {
        if (error) {
            if (error.name === 'TokenExpiredError')
                return res.status(403).send({ message: 'Token has expired!' })

            return res.status(403).json(error)
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken
