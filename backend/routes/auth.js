const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const validateLoginInput = require("../validation/login");
// const validateRegistrationInput = require("../validation/register");
//const   = require("../middleware/auth");

//Loading environment variables
dotenv.config({ path: "./configs/config.env" });

//@desc : Invite a user
//@route: POST api/auth/invite/:userId
//access: Private
router.post(
  "/invite/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const invited_userID = req.params.userId;
    try {
      const invitedUser = await User.findById({ _id: invited_userID });
      if (!invitedUser) {
        return res.json({ success: false, message: "User not found" });
      }
      const emailBody = `
      Dear ${invitedUser.firstName},
      ${req.user.firstName} has invited you to be their Survival Guide partner. Follow the link below to accept
      http://localhost:3000/accept/${req.user._id}
      `;

      const msg = {
        to: invitedUser,
        from: "yabre.tech@gmail.com",
        subject: "Let's be Study Partners",
        text: emailBody,
      };
      const result = await sgMail
        .send(msg)
        .then((res) => {
          console.log(res);

          return;
        })
        .catch((error) => {
          console.error(error);
        });

      return res.json({ success: true, result: result });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  }
);
/**
@DESC accept invitation from a user
@Access: private
@POST : /api/auth/accept/:userId
 */
router.post(
  "/accept/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const inviterId = req.params.userId;
    try {
      const inviter = await User.findById({ _id: inviterId });
      if (!inviter) {
        return res.json({ success: false, message: "User not found" });
      }
      let inviterPartners = inviter.partners;
      inviterPartners.push(req.user._id);
      invitedPartners = req.user.partners;
      invitedPartners.push(inviter._id);
      await User.findByIdAndUpdate(
        { _id: inviterId },
        { partners: inviterPartners },
        { new: true }
      );
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { partners: invitedPartners },
        { new: true }
      );

      const emailBody = `
      Dear ${inviter.firstName},
      ${req.user.firstName} has accepted you to be their Survival Guide partner. Happy studies !
      The Survival Guide Team.
      `;
      const msg = {
        to: inviter,
        from: "yabre.tech@gmail.com",
        subject: "Invite Accepted",
        text: emailBody,
      };
      const result = await sgMail
        .send(msg)
        .then((res) => {
          console.log(res);

          return;
        })
        .catch((error) => {
          console.error(error);
        });

      return res.json({ success: true, result: result });
    } catch (err) {
      return res.json({ success: false, message: err.message });
    }
  }
);
//desc Sign user up
//@access:Public
//route:POST api/auth/register
router.post("/register", async (req, res) => {
  console.log(res);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const avatar = gravatar.url(req.body.email, {
    s: "200", //size
    r: "pg", // rating
    d: "mm", // default
  });

  try {
    const user = await User.findOne({ email: req.body.email });
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      avatar: avatar,
      phone_number: req.body.email,
      preferred_com_mode: req.body.preferred_com_mode,
    });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Email address already taken." });
    } else {
      const savedUser = await newUser.save();
      return res.json({ success: true, user: savedUser });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

//POST api/auth/login
//Log user in
//access: Public

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    if (req.isAuthenticated()) {
      return res
        .status(400)
        .json({ success: false, message: "User already signed in." });
    } else {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (isPasswordMatched) {
        //Creating a jwt payload
        const payload = {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone_number: user.phone_number,
          avatar: user.avatar,
          partners: user.partners,
          tasks: user.tasks,
          preferred_com_mode: user.preferred_com_mode,
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 7200 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Password incorrect." });
      }
    }
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

//Log user out
//POST api/auth/logout
//access:Private
router.delete("/logout", (req, res) => {
  try {
    req.logOut();
    return res.json({ success: true, message: "Logged out successfully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});

//get current user
//@router GET api/auth/currentUser
//access:Private
router.get(
  "/currentUser",

  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    try {
      return res.json({ success: true, user: req.user });
    } catch (error) {
      return res.json({ success: false, message: error.message });
    }
  }
);

//get all users
//@router GET api/auth/all
//access:Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(400).json({
          message: "You do not have permission to perform this action",
        });
      }
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

//get all users
//@router GET api/auth/delete:user_id
//access:Private

router.delete(
  "/delete/:user_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (req.user.role === "basic" || req.user.role === "admin") {
        return res.status(400).json({
          message: "You do not have permission to perform this action",
        });
      }
      await User.findOneAndRemove({ _id: req.params.user_id });
      req.flash("success", "User delete successfully");
      res.redirect("api/dashboard");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// invite partner
//@router POST api/auth/password/reset
//access:Private

module.exports = router;
