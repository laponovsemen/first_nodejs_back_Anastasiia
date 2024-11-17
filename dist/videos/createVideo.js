"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideo = void 0;
const db_1 = require("../db/db");
const video_types_1 = require("../input-output-types/video-types");
const inputValidation = (video) => {
    var _a, _b, _c;
    const errors = {
        errorsMessages: []
    };
    if (!video.title || video.title.length > 40) {
        (_a = errors.errorsMessages) === null || _a === void 0 ? void 0 : _a.push({
            message: 'Title is required and should not exceed 40 characters!',
            field: 'title'
        });
    }
    if (!video.author || video.author.length > 20) {
        (_b = errors.errorsMessages) === null || _b === void 0 ? void 0 : _b.push({
            message: 'Author is required and should not exceed 20 characters!',
            field: 'author'
        });
    }
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.length === 0 ||
        video.availableResolutions.some(r => !Object.values(video_types_1.Resolutions).includes(r))) {
        (_c = errors.errorsMessages) === null || _c === void 0 ? void 0 : _c.push({
            message: 'Invalid resolution! At least one valid resolution should be added.',
            field: 'availableResolutions'
        });
    }
    return errors;
};
const createVideo = (req, res) => {
    const errors = inputValidation(req.body);
    if (errors.errorsMessages && errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors);
        return;
    }
    const newVideo = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random(), createdAt: new Date().toISOString(), publicationDate: new Date().toISOString(), canBeDownloaded: true, minAgeRestriction: null });
    db_1.db.videos = [...db_1.db.videos, newVideo];
    res
        .status(201)
        .json(newVideo);
};
exports.createVideo = createVideo;
