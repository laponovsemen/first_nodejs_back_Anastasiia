"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoController = exports.videoRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const settings_1 = require("../settings");
const createVideo_1 = require("./createVideo");
exports.videoRouter = (0, express_1.Router)();
exports.videoController = {
    getVideos: (req, res) => {
        const videos = db_1.db.videos; // получаем видео из базы данных
        res.status(200).json(videos); // отдаём видео в качестве ответа
    },
    createVideo: (req, res) => (0, createVideo_1.createVideo)(req, res),
    deleteVideo: (req, res) => {
        const id = parseInt(req.params.id); // получаем id видео из запроса
        const index = db_1.db.videos.findIndex((video) => video.id === id); // ищем индекс видео в базе данных
        if (index === -1) { // если видео не найдено
            res.status(404).send('Video not found'); // отдаём ошибку
            return;
        }
        db_1.db.videos.splice(index, 1); // удаляем видео из базы данных
        res.status(204).send(); // отдаём пустой ответ
    }
};
exports.videoRouter.get(settings_1.SETTINGS.PATH.VIDEOS, exports.videoController.getVideos);
exports.videoRouter.post(settings_1.SETTINGS.PATH.SPECIFIC_VIDEO, exports.videoController.createVideo);
exports.videoRouter.delete(settings_1.SETTINGS.PATH.DELETE_ALL, exports.videoController.deleteVideo);
