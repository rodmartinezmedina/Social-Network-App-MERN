const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("config");
const mongoose = require("mongoose");
const parser = require("../../config/cloudinary");

// The base Cloudinary API endpoint looks like this:
// https://api.Cloudinary.com/v1_1/:cloud_name/:action
// "https://api.Cloudinary.com/v1_1/:dvioc75zu/image/upload",
router.post("/", parser.single("userImg"), (req, res, next) => {
  console.log("inside cloudinary upload route");

  let userImg = {};
  const image_url = req.file.secure_url;
  res.status(201).json(image_url);
  // console.log(userImg.url);
});

module.exports = router;
