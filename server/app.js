require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRouter = require('./userManagement/userRouter')
const perfumeRouter = require('./perfumeManagement/perfumeRouter')
const orderRouter = require('./orderManagement/orderRouter')

const port = process.env.PORT
const allowedOrigins = process.env.FRONTEND_ORIGINS

app.use(express.json())
app.use(cors({
    origin: allowedOrigins.split(','),
    credentials: true
}))
app.use(cookieParser())
app.use(userRouter)
app.use(perfumeRouter)
app.use(orderRouter)

app.use('/', (req, res) => {
    res.send('Server is runnning!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
