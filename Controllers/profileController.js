const User = require("../Models/user");
const path = require('path');
const fs = require('fs');

const getProfile = async (req, res) => {
    try {
        return res.status(200).json({ data: req.user });
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userToUpdate = await User.findById(req.user._id);
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound && (userToUpdate.email !== req.body.email)) {
            res.status(400).json({ message: "Cette adresse e-mail est déjà utilisée!" })
        } else {
            if (req.file) {
                const fileName = path.basename(userToUpdate.avatar);
                const filePath = path.resolve('./storages', fileName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                req.body.avatar = `${req.protocol}://${req.headers.host}/${req.file.filename}`;
            }
            const updatedProfile = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
            res.json({
                message: "Modification a été effectuée avec succès.", 
            avatar: updatedProfile.avatar,
            username: updatedProfile.nom,
         });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne dans le serveur!" });
    }
}

module.exports = {
    getProfile,
    updateUserProfile,
}