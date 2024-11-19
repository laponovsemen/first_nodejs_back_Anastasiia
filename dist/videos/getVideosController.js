"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoController = exports.videoRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const createVideo_1 = require("./createVideo");
exports.videoRouter = (0, express_1.Router)();
exports.videoController = {
    getVideos: (req, res) => {
        const videos = db_1.db.videos;
        console.log('get all videos if exist');
        res.status(200).json(videos);
    },
    createVideo: (req, res) => (0, createVideo_1.createVideo)(req, res),
    deleteVideo: (req, res) => {
        const id = parseInt(req.params.id);
        const index = db_1.db.videos.findIndex((video) => video.id === id);
        if (index === -1) {
            res.status(404).send('Video not found');
            return;
        }
        db_1.db.videos.splice(index, 1);
        res.status(204).send();
    },
    deleteAllVideos: (req, res) => {
        db_1.db.videos = [];
        res.status(204).send();
    }
};
exports.videoRouter.get("/", exports.videoController.getVideos);
exports.videoRouter.post("/", exports.videoController.createVideo);
