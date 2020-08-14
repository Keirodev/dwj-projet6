const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
    const userId = decodedToken.userId
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID'
    } else {
      next()
    }
  } catch {
    res.status(httpStatus.UNAUTHORIZED).json({
      error: new Error('Invalid request !' + httpStatus[httpStatus.UNAUTHORIZED])
    })
  }
}
