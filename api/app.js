const express = require('express');
const httpStatus = require('http-status')
const mongoose = require('mongoose')
require('dotenv').config()



mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_LOGIN}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('/!\\ Connexion à MongoDB échouée !/!\\'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/**
 * @param req {{prenom: String}}
 */
app.get('/coucou/:prenom', (req, res, next) => {
  const stuff = {message: `coucou ${req.params.prenom}`}
  res.status(httpStatus.OK).json(stuff);

});

app.get('/api/stuff', (req, res, next) => {
  res.status(httpStatus.OK).json(stuff);
});

app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(httpStatus.CREATED).json({
    message: 'Objet créé !'
  });
});

app.use(function(req, res, next){
  res.setHeader('Content-Type', 'text/plain');
  res.status(httpStatus.NOT_FOUND).send(`Page introuvable ! (${httpStatus.NOT_FOUND + ' ' + httpStatus[httpStatus.NOT_FOUND]}) `);
});

module.exports = app;
