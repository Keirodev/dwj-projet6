const Sauce = require('../models/Sauce')

const httpStatus = require('http-status')

exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then(sauces => res.status(httpStatus.OK).json(sauces))
    .catch(error => res.status(httpStatus.BAD_REQUEST).json({error}))
}

exports.getSauce = (req, res) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauce => res.status(httpStatus.OK).json(sauce))
    .catch(error => res.status(httpStatus.BAD_REQUEST).json({error}))
}

exports.addSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce)
  const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0
    }
  )
  sauce.save()
    .then(() => res.status(httpStatus.CREATED).json({message: 'Objet enregistré !'}))
    .catch(error => res.status(httpStatus.BAD_REQUEST).json({error}))

}

exports.updateSauce = (req, res) => {
  res.status(httpStatus.OK).json({message: 'updateSauce'})
}

exports.deleteSauce = (req, res) => {
  res.status(httpStatus.OK).json({message: 'deleteSauce'})
}

exports.handleLike = (req, res) => {
  res.status(httpStatus.OK).json({message: 'handleLike'})
}

