
const Estamp = require("../Models/estamp");
const Efleur = require("../Models/efleur");
const fs = require('fs');
const cloudinary = require('../middelwares/cloudinary');

module.exports = {
  CreateStamp: async function (request, result) {
    // Upload the photo 
    let data = { url: '' }
    if (request.file) {
      const uploader = async (path) => await cloudinary.uploads(path, 'estamps');
      const { path } = request.file;
      data = await uploader(path);
      fs.unlinkSync(path);
    }
    // Create new record in the database
    const newEstamp = {
      sujet: request.body.sujet,
      reference: request.body.reference,
      photo: data.url,
      format: request.body.format,
      dateEmission: request.body.dateEmission,
      serie: request.body.serie,
      artiste: request.body.artiste,
      //prix:request.body.prix, // le prix est ajouté dasn le product pour le test au panier
      categorie: request.body.categorie,
      //Nous avons ajouté la quantité de produits disponible pour Estamp
      QunatityEstampDisponible: Number.parseInt(request.body.QunatityEstampDisponible),
      //etatProduct:request.body.etatProduct
    };
    Estamp.create(newEstamp, (error, estamp) => {
      if (error) {
        result.status(500).json({
          message: error,
          status: 500
        });
      } else {
        result.status(200).json({
          message: "Le timbre a été crée avec succès.",
          status: 200,
          data: estamp,
        });

      }

    });
  },
  UpdateEstamp: async function (req, res) {
    const estampFound = await Estamp.findById(req.params.id);
    // Update the photo if necessary
    if (req.file !== undefined) {
      const uploader = async (path) => await cloudinary.uploads(path, 'estamps');
      const { path } = req.file;
      data = await uploader(path);
      fs.unlinkSync(path);
      // delete old photo if necessary
      if (estampFound.photo.includes('/estamps/')) {
        const assetName = estampFound.photo.slice(estampFound.photo.lastIndexOf('estamps'), estampFound.photo.lastIndexOf('.'))
        cloudinary.destroyAsset(assetName);
      }
      // update photo after upload
      req.body.photo = data.url;
    }
    Estamp.updateOne({ _id: req.params.id }, req.body).exec((err, estampUpdate) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Le timbre a été modifié avec succès.",
          data: estampUpdate,
        });
      }
    });
  },

  UpdateEtaProductEstamp: function (req, res) {
    Estamp.updateOne({ _id: req.params.id }, { "etatProduct": "OUI" }).exec((err, estampUpdate) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "etat est modifié !",
          data: estampUpdate,
        });
      }

    });
  },

  //get estamp by ID 
  GetEstampByID: function (req, res) {
    Estamp.findOne({ _id: req.params.id }).exec((err, estampByid) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "un timbre est séléctonné par ID !",
          data: estampByid,
        });
      }
    });
  },
  //delete Estamp 
  DeleteEstamp: async function (req, res) {
    const estampFound = await Estamp.findById(req.params.id);
    // delete old photo if necessary
    if (estampFound.photo.includes('/estamps/')) {
      const assetName = estampFound.photo.slice(estampFound.photo.lastIndexOf('estamps'), estampFound.photo.lastIndexOf('.'))
      cloudinary.destroyAsset(assetName);
    }
    Estamp.deleteOne({ _id: req.params.id }).exec((err, estamp) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Le timbre a été supprimé avec succès.",
          data: estamp,
        });
      }
    });
  },

  //GEt all estamp 


  GetAllEstamp: function (req, res) {
    Estamp.find({})
      .populate('categorie')
      .exec((err, ListEStamps) => {
        if (err) {
          res.status(500).json({
            message: "echec d'avoir la liste",
            status: 500,
          });
        } else {
          res.status(200).json(ListEStamps);
        }
      });
  },


  GetEstampEtatOui: function (req, res) {
    Estamp.find({ "etatProduct": "OUI" })
      .populate('categorie')
      .exec((err, ListEStamps) => {
        if (err) {
          res.status(500).json({
            message: "echec d'avoir la liste",
            status: 500,
          });
        } else {
          res.status(200).json(ListEStamps);
        }
      });
  },

  getProductsToApprouve: async (req, res) => {
    try {
      const listEfleursToApprouve = await Efleur.find({ "etatProduct": "NON" });
      const listEStampsToApprouve = await Estamp.find({ "etatProduct": "NON" });
      // Step 5: return response
      res.json({ listEStampsToApprouve, listEfleursToApprouve });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "echec d'avoir la liste",
        status: 500,
      });
    }

  }
}
