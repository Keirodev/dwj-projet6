const bcrypt = require('bcrypt')
const httpStatus = require('http-status')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      })
      user.save()
        .then(() => res.status(httpStatus.CREATED).json({message: 'Utilisateur créé !'}))
        .catch(error => res.status(httpStatus.BAD_REQUEST).json({error}))
    })
    .catch(error => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error}))
}

exports.login = (req, res) => {

  User.findOne({email: req.body.email})
    .then(user => {

      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({error: 'Utilisateur non trouvé !'})
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(httpStatus.UNAUTHORIZED).json({error: 'Mot de passe incorrect !'})
          }
          res.status(httpStatus.OK).json({
            userId: user._id,
            token: jwt.sign(
              {userId: user._id},
              process.env.SECRET_TOKEN,
              {expiresIn: '24h'}
            )
          })
        })
        .catch(error => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error}))
    })
    .catch(error => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error}))
}


