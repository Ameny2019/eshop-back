const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, (result) => {
      // console.log(result);
      resolve({ url: result.url, id: result.public_id });
    }, {
      ressource_type: 'auto',
      folder: folder
    });
  });
}

exports.destroyAsset = (assetName) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(assetName, (result) => {
      // console.log(result);
      resolve(result);
    });
  });
}