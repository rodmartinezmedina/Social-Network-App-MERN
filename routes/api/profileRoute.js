const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/ProfileModel");
const User = require("../../models/UserModel");

// // @route GET api/profile
// // @desc  Test route
// router.get("/", (req, res) => res.send("Profile route"));

//
// @route GET api/profile/me
// @desc  Get current user's profile
router.get("/me", auth, async (req, res) => {
  try {
    //user ir comes from the token. I asked for it on profile model => user
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//
// @route GET api/profile
// @desc  Create or update user profile

//1- Use auth middleware to see if logged in etc. Basic Checks
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  // 2-Check for errors
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //3- Build the profileFields object to insert into the DB.
    //Need to initialize profileFields
    //Check if fields exist
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //Build social medias object
    //If we dont initialize the object it throws error:
    // Ex: "can't find youtube of undefined"
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    //4- Look for a proffile by the user
    //req.user.id comes from the token that identifies user
    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update profile if profile is found with the corresponding req.user.id
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create profile if not profile found
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    // console.log(profileFields.skills);
    // res.send("Hello");
  }
);

//
// @route GET api/profile
// @desc  Get all profiles
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//
// @route GET api/profile/user/:user_id
// @desc  Get profile by user ID
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;
