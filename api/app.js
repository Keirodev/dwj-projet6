require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const httpStatus = require('http-status')

const sauceRoutes = require('./src/routes/sauce')
const userRoutes = require('./src/routes/user')

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_LOGIN}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('/!\\ Connexion à MongoDB échouée !/!\\'))

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(bodyParser.json())
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes)

app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'text/plain')
  res.status(httpStatus.NOT_FOUND).send(`Page introuvable ! (${httpStatus.NOT_FOUND + ' ' + httpStatus[httpStatus.NOT_FOUND]}) `)
})

module.exports = app
