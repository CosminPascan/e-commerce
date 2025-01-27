const bcrypt = require('bcrypt')
const db = require('../database/dbConfig')
const jwt = require('jsonwebtoken')
const privateKey = process.env.PRIVATE_KEY

const registerUser = async (req, res) => {
    const { email, password } = req.body

    const role = req.body.role ? req.body.role : 'user'

    const username = email.substring(0, email.indexOf('@'))
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = {
        email: email,
        username: username,
        password: hashedPassword,
        role: role
    }

    try {
        const newUser = await db.collection('users').add(user)
        const userDocument = await newUser.get()
        const userData = userDocument.data()

        res.status(201).json({
            id: newUser.id,
            ...userData
        })
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const loginUser = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }

    const usersRef = db.collection('users')
    const querySnapshot = await usersRef.where('email', '==', user.email).limit(1).get()

    if (querySnapshot.empty) return res.status(401).send({ message: 'No account with this email!' })

    let encodedData = {}
    let hashedPassword = ''

    querySnapshot.forEach((doc) => {
        const userData = doc.data()
        encodedData.id = doc.id
        encodedData.email = userData.email
        encodedData.username = userData.username
        encodedData.role = userData.role
        hashedPassword = userData.password
    })

    bcrypt.compare(user.password, hashedPassword, (error, result) => {
        if (result) {
            const accessToken = jwt.sign(encodedData, privateKey, { expiresIn: '3000s' })
            res.cookie('access-token', accessToken, { httpOnly: true })
            res.status(200).send({ user: encodedData, accessToken: accessToken })
        } else {
            res.status(401).send({ message: 'Wrong password! Try again!' })
        }
    })
}

const getAllUsers = async (req, res) => {
    try {
        const usersRef = db.collection('users')
        const querySnapshot = await usersRef.get()

        const users = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(JSON.stringify(error))
    }
}

const checkEmailNotUsed = async (email) => {
    try {
        const usersRef = db.collection('users')
        const querySnapshot = await usersRef.where('email', '==', email).limit(1).get()

        if (!querySnapshot.empty) {
            return Promise.reject('Email already used!')
        }

        return true
    } catch (error) {
        console.error('Error checking email: ', error)
        throw error
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    checkEmailNotUsed
}
