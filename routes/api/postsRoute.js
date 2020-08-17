const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/authMiddleware");
const User = require("../../models/UserModel");
const Post = require("../../models/PostModel");
const Profile = require("../../models/ProfileModel");
// // @route GET api/posts
// // @desc  Test route
// router.get("/", (req, res) => res.send("Posts route"));

// @route POST api/posts
// @desc  Create a post
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      // await profile.save();
      // res.json(profile);

      const post = await newPost.save();
      res.json(post);
      //
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
