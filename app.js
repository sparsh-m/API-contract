const express = require('express')
const app = express()

const visitRouter = require('./routes/visits')
const authRouter = require('./routes/auth')

//To parse req.body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//MongoDB Atlas connection
const mongoose = require('mongoose')
mongoose.connect('process.env.MONGOSTRING', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//Request Routes
app.use('/', visitRouter)
app.use('/auth', authRouter);

app.listen(3000, () => console.log('Server Started'))
