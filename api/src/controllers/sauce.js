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
    .then(sauce => {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', sauce)
      res.status(httpStatus.OK).json(sauce)
    })
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
    .then(() => res.status(httpStatus.OK).json({message: 'Objet modifié !'}))
    .catch(error => res.status(httpStatus.BAD_REQUEST).json({error}))

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

/**
 * @param req {{body: {userId: String, like: Number}, params: {id: String}}}
 * @param res
 */
exports.handleLike = (req, res) => {

  const sauceId = req.params.id

  Sauce.findOne({_id: sauceId})
    .then(sauce => {

      // -1 = ajouter dans userDislike
      // 0 = retirer si il existe danrs ld'un ou l'autre
      // 1 ajouter userLikes
      let usersLiked = sauce.usersLiked
      let usersDisliked = sauce.usersDisliked
      const userId = req.body.userId

      /**
       * Provide an abstraction to avoid duplication code while working with Arrays
       * @param array {String[]}
       * @param valueToRemove {String}
       */
      const removeFromArray = (array, valueToRemove) => {
        let index = array.indexOf(valueToRemove)
        if (index > -1) array.splice(index, 1)
      }

      let index
      switch (req.body.like) {

        case 0:
          // L'user annule son choix, on le retire d'un tableau si il y est
          // utilisateur a déjà liké ?
          removeFromArray(usersLiked, userId)
          // utilisateur a déjà disliké ?
          removeFromArray(usersDisliked, userId)
          break

        case 1:
          // utilisateur à déjà liké ?
          index = usersLiked.indexOf(userId)
          // il n'a pas le droit de reliker ! on stop et informe le front
          if (index > -1) return Promise.resolve('Cet a tilisateur a déja liké ça !')

          // utilisateur a déjà disliké ? Si oui, on le retire du tableau
          removeFromArray(usersDisliked, userId)
          // puis l'ajoute dans le like
          usersLiked.push(userId)
          break

        case -1:
          // utilisateur à déjà disliké ?
          index = usersDisliked.indexOf(userId)
          // il n'a pas le droit de re-disliker ! on stop et informe le front
          if (index > -1) return Promise.resolve('Cet utilisateur a déja disliké ça !')

          // utilisateur a déjà liké ? Si oui, on le retire du tableau
          removeFromArray(usersLiked, userId)

          // puis on l'ajoute dans le dislike
          usersDisliked.push(userId)
          break
      }

      const likes = usersLiked.length
      const dislikes = usersDisliked.length


      // Build new object from this new one
      const sauceObject = {
        ...sauce._doc,
        _id: sauceId,
        likes,
        dislikes,
        usersLiked,
        usersDisliked
      }

      // return final object to update
      return sauceObject

    })
    .then(sauce => Sauce.updateOne({_id: sauceId}, sauce))
    .then(() => res.status(httpStatus.OK).json({message: '(Dis-)Likes updated !'}))
    .catch(error => res.status(httpStatus.BAD_REQUEST).json({message: error}))

}

