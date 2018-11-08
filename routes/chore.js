const express = require("express");
const { Router } = express;
const Chore = require("../models/chore");
const choreRouter = Router();

choreRouter.route("/")
  .get((req, res, next) => {
    Chore.find({})
      .then(chores => res.status(200).send(chores))
      .catch(err => next(err))
  })
  .post((req, res, next) => {
    const newChore = new Chore(req.body);
    newChore.save()
    .then(chore => res.status(201).send(chore))
    .catch(err => next(err))
  })

choreRouter.route("/:id")
  .get((req, res, next) => {
    Chore.findOne(req.params.id)
      .then(foundChore => res.status(200).send(foundChore))
      .catch(err => next(err))
  })
  .put((req, res, next) => {
    Chore.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then(editedChore => res.status(200).send(editedChore))
      .catch(err => next(err))
  })
  .delete((req, res, next) => {
    Chore.findOneAndDelete(req.params.id)
      .then(() => res.status(204).send())
      .catch(err => next(err))
  })

  module.exports = choreRouter;

