
const Estamp = require("../Models/estamp");
const Efleur = require("../Models/efleur");

module.exports = {
  CreateStamp: async function (request, result) {
    const newEstamp = {
      sujet: request.body.sujet,
      reference: request.body.reference,
      photo: `${process.env.BACKEND_URL}${request.file.filename}`,
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
  UpdateEstamp: function (req, res) {
    // update the photo if necessary
    if (req.file !== undefined) {
      req.body.photo = `${process.env.BACKEND_URL}${req.file.filename}`
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
  DeleteEstamp: function (req, res) {
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
      res.json({listEStampsToApprouve, listEfleursToApprouve});
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "echec d'avoir la liste",
        status: 500,
      });
    }

  }
}
