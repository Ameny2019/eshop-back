const User = require("../Models/user");
const path = require('path');
const fs = require('fs');
const cloudinary = require('../middelwares/cloudinary');

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
                const uploader = async (path) => await cloudinary.uploads(path, 'avatars');
                const { path } = req.file;
                const data = await uploader(path);
                fs.unlinkSync(path);
                // delete old avatar if necessary
                if (userToUpdate.avatar.includes('/avatars/')) {
                    const assetName = userToUpdate.avatar.slice(userToUpdate.avatar.lastIndexOf('avatars'), userToUpdate.avatar.lastIndexOf('.'))
                    cloudinary.destroyAsset(assetName);
                }
                // update avatar after upload
                req.body.avatar = data.url;
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