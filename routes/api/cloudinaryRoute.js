const express = require("express");
const axios = require("axios");
const router = express.Router();
const config = require("config");
const mongoose = require("mongoose");
const parser = require("../../config/cloudinary");

router.post("/imageUpload", parser.single("userImg"), (req, res, next) => {
  console.log("inside cloudinary upload route");
  const image_url = req.file.secure_url;
  res.status(201).json(image_url);
});

module.exports = router;
