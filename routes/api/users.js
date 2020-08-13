const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/UserModel");

// @route POST api/users
// Register a user
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      //See if users exist

      //Get user gravatar

      //Encrypt password

      //Return jsonwebtoken

      res.send("User route");
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Sewrver Error`);
    }
  }
);

module.exports = router;
