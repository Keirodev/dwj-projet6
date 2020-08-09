const httpStatus = require('http-status')

exports.Display = (req, res, next) => {
  const stuff = {message: `coucou ${req.params.prenom}`}
  res.status(httpStatus.OK).json(stuff);
}
