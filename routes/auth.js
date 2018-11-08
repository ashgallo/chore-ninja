const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (err) {
      res.status(500);
      return next(err);
    } else if(existingUser !== null ) {
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
  User.findOne({ username: req.body.username.withoutPassword() }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    if (!user) {
      return res.status(403).send({ reason: "Username not found" })
    }
    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send(err);
      if(!isMatch) res.status(401).send({ reason: "Invalid passsword" });
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
      return res.send({ user: user.withoutPassword(), token })
    });
  });
});

authRouter.put("/:id/addKid", (req, res, next) => {
  User.findOneAndUpdate(reg.params.id, req.body, { new: true })
      .then(editedParent => res.status(200).send(editedParent))
      .catch(err => next(err))
})

authRouter.delete("/:id/deleteKid", (req, res, next) => {
  User.deleteOne(req.params.id)
      .then(() => res.status(204).send())
      .catch(err => next(err))
})

module.exports = authRouter;
