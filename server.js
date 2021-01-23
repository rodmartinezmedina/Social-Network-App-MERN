const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const bodyParser = require("body-parser");

const express = require("express");
const connectDB = require("./config/db");
const path = require ('path');

const app = express();

//
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// This line was used during development
// app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/usersRoute"));
app.use("/api/profile", require("./routes/api/profileRoute"));
app.use("/api/posts", require("./routes/api/postsRoute"));
app.use("/api/auth", require("./routes/api/authRoute"));
app.use("/api/cloudinary", require("./routes/api/cloudinaryRoute"));

// Serve static assets in production
if(process.env.NODE_ENV === 'production' ) {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// //
// //
// //
// //Cloudinary images upload
// //Multer part
// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   },
// });

// const imageFilter = function (req, file, cb) {
//   // accept image files only
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
//     return cb(new Error(`Only image files are accepted!`), false);
//   }
//   cb(null, true);
// };

// const upload = multer({ storage: storage, fileFilter: imageFilter });

// //Cloudinary part
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME, //my cloudinary name
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// //
// //
// //
