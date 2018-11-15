const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) {
      res.status(500);
      return next(err);
    } else if (existingUser !== null) {
      res.status(400);
      return next(new Error("Username already exists"));
    }
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
      return res.status(201).send({ user: user.withoutPassword(), token });
    });
  });
});

authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      return res.status(403).send({ reason: "Username not found" })
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send(err);
      if (!isMatch) return res.status(401).send({ reason: "Invalid passsword" });
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
      return res.send({ user: user.withoutPassword(), token })
    });
  });
});

authRouter.get("/verify", expressJwt({ secret: process.env.SECRET }), (req, res, next) => {
  User.findById(req.user._id)
    .then(user => res.status(200).send(user))
    .catch(err => next(err));
})

// Parent - Add a kid and assign
authRouter.put("/:id/addKid", expressJwt({ secret: process.env.SECRET }), async (req, res, next) => {

  await Promise.all(req.body.kids.map(kid => User.findOneAndUpdate({ username: kid }, { parents: req.user._id }, { new: true })));
  const kids = await User.find({ parents: req.user._id });
  User.findOneAndUpdate({ _id: req.params.id }, { kids: kids.map(kid => kid._id) }, { new: true })
    .then(editedParent => res.status(200).send(editedParent))
    .catch(err => next(err))
});

// FIXME: This will delete the parent because of req.params.id
// Parent - Delete a kid assigned to them
authRouter.delete("/:id/deleteKid", expressJwt({ secret: process.env.SECRET }), (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(204).send())
    .catch(err => next(err))
});

// Parent - Get list of kids assigned to them
authRouter.get("/getKids", expressJwt({ secret: process.env.SECRET }), (req, res, next) => {
  User.find({ parents: req.user._id })
    .then(kids => res.status(200).send(kids))
    .catch(err => next(err))
});

// Kid - Redeem reward 
authRouter.put("/:id/redeemReward", expressJwt({ secret: process.env.SECRET }), (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(editedKid => res.status(200).send(editedKid))
    .catch(err => next(err))
})

// Parent - Earned reward (approves redeem reward) 
authRouter.put("/:id/earnedReward", expressJwt({ secret: process.env.SECRET }), (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(editedParent => res.status(200).send(editedParent))
    .catch(err => next(err))
})

module.exports = authRouter;