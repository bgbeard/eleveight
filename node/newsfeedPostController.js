const newsfeedPostService = require("./newsfeedPostService");
const responses = require("../models/response");

const post = (req, res) => {
    newsfeedPostService.post(req.body)
        .then(result => res.json(new responses.itemResponse(result)))
        .catch(err => res.status(500).send(new responses.errorResponse(err)));
}

const readAll = (req, res) => {
    newsfeedPostService.readAll()
        .then(result => res.json(new responses.itemsResponse(result)))
        .catch(err => res.status(500).send(new responses.errorResponse(err)));
}
const getAllPublic = (req, res) => {
    newsfeedPostService.getAllPublic(req.params.userbaseId, req.params.offset)
        .then(result => res.json(new responses.itemResponse(result)))
        .catch(err => res.status(500).send(new responses.errorResponse(err)));
}

const getAllPrivate = (req, res) => {
    newsfeedPostService.getAllPrivate(req.params.userbaseId, req.params.offset)
        .then(result => res.json(new responses.itemsResponse(result)))
        .catch(err => res.status(500).send(new responses.errorResponse(err)));
}

const readById = (req, res) => {
    newsfeedPostService.readById(req.params.id)
        .then(result => res.json(new responses.itemResponse(result)))
        .catch(err => res.status(500).send(new responses.errorResponse(err)));
}

const update = (req, res) => {
    newsfeedPostService.update(req.body)
        .then(result => res.json(new responses.successResponse()))
        .catch(err => res.status(500).send(new responses.errorResponse(err)));
}

const deleteById = (req, res) => {
    newsfeedPostService.deleteById(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(new responses.errorResponse(err)));
}
module.exports = {
    post,
    readAll,
    getAllPublic,
    getAllPrivate,
    readById,
    update,
    deleteById
}