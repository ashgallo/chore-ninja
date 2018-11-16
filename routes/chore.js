const express = require("express");
const Chore = require("../models/chore");
const { upload } = require("../photo-config");
const path = require('path');

const { Router } = express;
const choreRouter = Router();

choreRouter.get('/',
  function (req, res, next) {
    // Parent - Get chores by createdBy
    if (req.user.role === "parent") {
      Chore.find({ createdBy: req.user._id })
        .then(chores => res.status(200).send(chores))
        .catch(err => next(err))
    } 
    // If not a parent, move on to next function
    else {
      next();
    }
  },
  function (req, res, next) {
    // Child - Get chores by assignedTo
    Chore.find({ assignedTo: req.user._id })
      .then(chores => res.status(200).send(chores))
      .catch(err => next(err))
  })

// Post a new chore
choreRouter.post("/", upload.single('image'), (req, res, next) => {
  req.body.image = req.file;
  const newChore = new Chore(req.body);
  newChore.createdBy = req.user._id;
  newChore.save()
    .then(chore => res.status(201).send(chore))
    .catch(err => next(err))
})


// Get, edit and delete a specific chore
choreRouter.route("/:id")
  .get((req, res, next) => {
    Chore.findOne({ _id: req.params.id })
      .then(foundChore => res.status(200).send(foundChore))
      .catch(err => next(err))
  })
  .put((req, res, next) => {
    Chore.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(editedChore => res.status(200).send(editedChore))
      .catch(err => next(err))
  })
  .delete((req, res, next) => {
    Chore.findOneAndDelete({ _id: req.params.id})
      .then(() => res.status(204).send())
      .catch(err => next(err))
  })
  choreRouter.route('/images/:filename')
    .get((req, res, next) => {
      res.sendFile(path.resolve(__dirname, '../temp/', req.params.filename))
    })

module.exports = choreRouter;