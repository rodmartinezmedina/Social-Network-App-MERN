const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const bodyParser = require("body-parser");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "mernsocialnetwork", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
  // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
});
const uploader = multer({ storage });
module.exports = uploader;
