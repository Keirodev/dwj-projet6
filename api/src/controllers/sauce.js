const httpStatus = require('http-status')

exports.getAllSauces = (req, res, next) => {
  res.status(httpStatus.OK).json({message: 'getAllSauces'})
}

exports.getSauce = (req, res, next) => {
  res.status(httpStatus.OK).json({message: 'getAgetSaucellSauces'})
}

exports.addSauce = (req, res, next) => {
  res.status(httpStatus.OK).json({message: 'addSauce'})
}

exports.updateSauce = (req, res, next) => {
  res.status(httpStatus.OK).json({message: 'updateSauce'})
}

exports.deleteSauce = (req, res, next) => {
  res.status(httpStatus.OK).json({message: 'deleteSauce'})
}

exports.handleLike = (req, res, next) => {
  res.status(httpStatus.OK).json({message: 'handleLike'})
}

