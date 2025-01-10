require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = 3000
const userRouter = require('./userManagement/userRouter')
const perfumeRouter = require('./perfumeManagement/perfumeRouter')

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())
app.use(userRouter)
app.use(perfumeRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
