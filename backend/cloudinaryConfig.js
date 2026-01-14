const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// 1. Configure Cloudinary with your keys
cloudinary.config({
  cloud_name: 'dg1nod3lc',
  api_key: '671853212198249',
  api_secret: 'kLbox80Xvd7FXUkaPa2xjHib5u0'
});

// 2. Configure Storage (Where to put the files)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mern-user-uploads', // The name of the folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;