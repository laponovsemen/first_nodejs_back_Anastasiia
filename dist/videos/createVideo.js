"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideo = void 0;
const db_1 = require("../db/db");
const video_types_1 = require("../input-output-types/video-types");
const inputValidation = (video) => {
    var _a, _b, _c, _d, _e;
    const errors = {
        errorsMessages: []
    };
    const title = (_a = video.title) === null || _a === void 0 ? void 0 : _a.trim();
    if (!title || title.length > 40) {
        (_b = errors.errorsMessages) === null || _b === void 0 ? void 0 : _b.push({
            message: 'Title is required and should not exceed 40 characters!',
            field: 'title'
        });
    }
    const author = (_c = video.author) === null || _c === void 0 ? void 0 : _c.trim();
    if (!author || author.length > 20) {
        (_d = errors.errorsMessages) === null || _d === void 0 ? void 0 : _d.push({
            message: 'Author is required and should not exceed 20 characters!',
            field: 'author'
        });
    }
    if (!Array.isArray(video.availableResolutions) || video.availableResolutions.length === 0 ||
        video.availableResolutions.some(r => !Object.values(video_types_1.Resolutions).includes(r))) {
        (_e = errors.errorsMessages) === null || _e === void 0 ? void 0 : _e.push({
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
    const createdAt = new Date();
    createdAt.setMilliseconds(0);
    const publicationDate = new Date(createdAt);
    publicationDate.setDate(publicationDate.getDate() + 1);
    publicationDate.setMilliseconds(0);
    const newVideo = Object.assign({ id: Math.floor(Date.now() / 1000), createdAt: createdAt.toISOString(), publicationDate: publicationDate.toISOString(), canBeDownloaded: false, minAgeRestriction: null }, req.body);
    db_1.db.videos = [...db_1.db.videos, newVideo];
    res
        .status(201)
        .json(newVideo);
};
exports.createVideo = createVideo;
