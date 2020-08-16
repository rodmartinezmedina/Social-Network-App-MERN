const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/UserModel");

// @route POST api/users
// @desc  Register a user
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
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //Get user gravatar
      const avatar = gravatar.url(email, {
        //size
        s: "200",
        //rating. not allowed forbidden images like, naked, violence, etc
        r: "pg",
        //default. mm gives some sort of icon if image not found
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(`Server Error`);
    }
  }
);

module.exports = router;
