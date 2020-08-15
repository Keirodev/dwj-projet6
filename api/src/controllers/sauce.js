const Sauce = require('../models/Sauce')

const fs = require('fs')
const path = require('path')

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

  // handle the case there is a file or not
  const finalSauce = !req.file
    ? {...req.body, _id: req.params.id}
    : {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      _id: req.params.id
    }

  Sauce.updateOne({_id: req.params.id}, finalSauce)
    .then(() => res.status(200).json({message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({error}))

}

exports.deleteSauce = async (req, res) => {


  Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        //delete localfile
        const imageName = sauce.imageUrl.split('/images/')[1]
        const imagePath = path.join(__dirname, '../../images/') + imageName
        return new Promise((resolve, reject) => {
          fs.unlink(imagePath, err => err
            ? reject('Fichier non supprimé ou introuvable')
            : resolve('Fichier Supprimé'))
        })
      }
    )
    // delete db info
    .then(() => Sauce.deleteOne({_id: req.params.id}))
    .then(sauce => res.status(httpStatus.OK).json(
      {
        message: 'Supprimé avec succès !',
        sauce: sauce
      }))
    .catch(error => res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error}))
}

exports.handleLike = (req, res) => {

  res.status(httpStatus.OK).json({message: 'handleLike'})

}

