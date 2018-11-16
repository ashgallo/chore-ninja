const express = require("express");
const Reward = require("../models/reward");
const { upload } = require("../photo-config");
const path = require("path");

const { Router } = express;
const rewardRouter = Router();

// Get and post rewards
rewardRouter.get("/", 
    function (req, res, next) {
        if(req.user.role === 'parent') {
        Reward.find({ createdBy: req.user._id })
            .then(rewards => res.status(200).send(rewards))
            .catch(err => next(err))
        } else {
            next();
        }
    },
    function (req, res, next) {
        Reward.find({ restrictedTo: req.user._id })
            .then(rewards => res.status(200).send(rewards))
            .catch(err => next(err))
    }
)

rewardRouter.post('/', upload.single('image'),(req, res, next) => {
    req.body.image = req.file;
    const newReward = new Reward(req.body);
    newReward.createdBy = req.user._id;
    newReward.save()
        .then(reward => res.status(201).send(reward))
        .catch(err => next(err))
})

// Get, put, and delete specific rewards
rewardRouter.route("/:id")
    .get((req, res, next) => {
        Reward.findOne({ _id: req.params.id })
            .then(reward => res.status(200).send(reward))
            .catch(err => next(err))
    })
    .put((req, res, next) => {
        Reward.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true })
            .then(editedReward => res.status(200).send(editedReward))
            .catch(err => next(err))
    })
    .delete((req, res, next) => {
        Reward.findOneAndDelete({ _id: req.params.id})
            .then(() => res.status(204).send())
            .catch(err => next(err))
    })
rewardRouter.route('/images/:filename')
    .get((req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../temp/', req.params.filename))
})
module.exports = rewardRouter;