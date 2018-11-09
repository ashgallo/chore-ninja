const express = require("express");
const Chore = require("../models/chore");

const { Router } = express;
const choreRouter = Router();

choreRouter.get('/',
  function (req, res, next) {
    if (req.user.role === "parent") {
      //handle your parent stuff here
      Chore.find({ user: req.user._id })
        .then(chores => res.status(200).send(chores))
        .catch(err => next(err))
    } else {
      next();
    }
  },
  function (req, res, next) {
    //handle your child stuff here
    Chore.find({ assignedTo: req.user._id })
      .then(chores => res.status(200).send(chores))
      .catch(err => next(err))
  })

choreRouter.post("/", (req, res, next) => {
  const newChore = new Chore(req.body);
  newChore.createdBy = req.user._id;
  newChore.save()
    .then(chore => res.status(201).send(chore))
    .catch(err => next(err))
})

choreRouter.route(":id")
  .get((req, res, next) => {
    Chore.findOne({ _id: req.user._id })
      .then(foundChore => res.status(200).send(foundChore))
      .catch(err => next(err))
  })
  .put((req, res, next) => {
    Chore.findOne({ _id: req.user.id }, req.body, { new: true })
      .then(editedChore => res.status(200).send(editedChore))
      .catch(err => next(err))
  })
  .delete((req, res, next) => {
    Chore.findByIdAndDelete(req.params._id)
      .then(() => res.status(204).send())
      .catch(err => next(err))
  })

module.exports = choreRouter;