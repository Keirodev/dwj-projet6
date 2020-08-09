const httpStatus = require('http-status')

exports.getRoot = (req, res, next) => {
  res.status(httpStatus.OK).json({message: 'Okayyyyyyyyyyy'})
}

exports.postRoot = (req, res, next) => {
  console.log(req.body)
  res.status(httpStatus.CREATED).json({
    message: 'Objet créé !'
  })
}

