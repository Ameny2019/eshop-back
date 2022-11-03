const Efleur = require("../Models/efleur");
module.exports = {
  CreatEfleur: async function (request, result) {
    const newEfleur = {
      nom: request.body.nom,
      photo: `${process.env.BACKEND_URL}${request.file.filename}`,
      //prix:request.body.prix,
      description: request.body.description,
      QunatityEfleurDisponible: Number.parseInt(request.body.QunatityEfleurDisponible)
    };
    Efleur.create(newEfleur, (error, Efleur) => {
      if (error) {
        result.status(500).json({
          message: error,
          status: 500
        });
      } else {
        result.status(200).json({
          message: "Un bouquet de fleurs a été créer avec succès.",
          status: 200,
          data: Efleur,
        });

      }

    });
  },
  UpdateEfleur: function (req, res) {
    // update the photo if necessary
    if(req.file !== undefined){
      req.body.photo =  `${process.env.BACKEND_URL}${req.file.filename}`
    }
    Efleur.updateOne({ _id: req.params.id }, req.body).exec((err, EfleurUpdate) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Le bouquet de fleurs a été modifié avec succès.",
          data: EfleurUpdate,
        });
      }
    });
  },



  //get Efleur by ID 
  GetEfleurByID: function (req, res) {
    Efleur.findOne({ _id: req.params.id }).exec((err, EfleurByid) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "les fleurs sont  séléctonné par ID !",
          data: EfleurByid,
        });
      }
    });
  },
  //delete Efleur 
  DeleteEfleur: function (req, res) {
    Efleur.deleteOne({ _id: req.params.id }).exec((err, Efleur) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Ces fleurs ont été supprimé avec succès.",
          data: Efleur,
        });
      }
    });
  },

  //GEt all Efleur 


  GetAllEfleur: function (req, res) {
    Efleur.find({})
      .exec((err, ListEfleur) => {
        if (err) {
          res.status(500).json({
            message: "echec d'avoir la liste",
            status: 500,
          });
        } else {
          res.status(200).json(ListEfleur);
        }
      });
  },


  GetEfleurEtatOui: function (req, res) {
    Efleur.find({ "etatProduct": "OUI" })
      //.populate('categorie')
      .exec((err, ListEfleurs) => {
        if (err) {
          res.status(500).json({
            message: "echec d'avoir la liste",
            status: 500,
          });
        } else {
          res.status(200).json(ListEfleurs);
        }
      });
  }

}

