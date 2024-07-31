require('dotenv').config()
const registerRouter = require('./register')
const loginRouter = require('./login')
const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection
const PORT = process.env.PORT || 5010
const app = express()
const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use('/api', registerRouter)
app.use('/api', loginRouter)

mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
mongoose.set('strictQuery', true)

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))