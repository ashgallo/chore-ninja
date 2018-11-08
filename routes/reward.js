const express = require("express");
const { Router } = express;

const Reward = require("../models/reward");

const rewardRouter = Router();

// Get and post rewards
rewardRouter.route("/")
    .get((req, res, next) => {
        Reward.find({})
            .then(rewards => res.status(200).send(rewards))
            .catch(err => next(err))
    })
    .post((req, res, next) => {
        const newReward = new Reward(req.body);
        newReward.save()
            .then(reward => res.status(201).send(reward))
            .catch(err => next(err))
    })

// Get, put, and delete specific rewards
rewardRouter.route("/:id")
    .get((req, res, next) => {
        Reward.findOne(req.params.id)
            .then(reward => res.status(200).send(reward))
            .catch(err => next(err))
    })
    .put((req, res, next) => {
        Reward.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(editedReward => res.status(200).send(editedReward))
            .catch(err => next(err))
    })
    .delete((req, res, next) => {
        Reward.findOneAndDelete(req.params.id)
            .then(() => res.status(204).send())
            .catch(err => next(err))
    })

module.exports = rewardRouter;