import {Response, Request} from 'express'
import {OutputErrorsType} from '../input-output-types/output-errors-type'
import {db} from '../db/db'
import {Resolutions} from '../input-output-types/video-types'
import {VideoDBType} from '../db/video-db-type'

const inputValidation = (video: Partial<VideoDBType>) => {
    const errors: OutputErrorsType = {
        errorsMessages: []
    };
    const title = video.title?.trim()
    if (!title || title.length > 40) {
        errors.errorsMessages?.push({
            message: 'Title is required and should not exceed 40 characters!',
            field: 'title'
        });
    }
    const author = video.author?.trim()

    if (!author || author.length > 20) {
        errors.errorsMessages?.push({
            message: 'Author is required and should not exceed 20 characters!',
            field: 'author'
        });
    }

    if (!Array.isArray(video.availableResolutions) || video.availableResolutions?.length === 0 ||
        video.availableResolutions?.some(r => !Object.values(Resolutions).includes(r))
    ) {
        errors.errorsMessages?.push({
            message: 'Invalid resolution! At least one valid resolution should be added.',
            field: 'availableResolutions'
        });
    }

    const canBeDownloaded = video.canBeDownloaded

    if (canBeDownloaded === undefined || typeof canBeDownloaded !== 'boolean') {
        errors.errorsMessages?.push({
            message: 'Field canBeDownloaded is required and should be boolean!',
            field: 'canBeDownloaded'
        });
    }

    const minAgeRestriction = video.minAgeRestriction

    if (minAgeRestriction !== null && (typeof minAgeRestriction !== 'number' || minAgeRestriction < 0)) {
        errors.errorsMessages?.push({
            message: 'Field minAgeRestriction should be a positive number or null!',
            field: 'minAgeRestriction'
        });
    }

    return errors
}

export const updateVideoF = (req: Request<any, any, Partial<VideoDBType>>, res: Response< VideoDBType | OutputErrorsType>) => {
    const video = db.videos.find(v => v.id === +req.params.id)
    if (!video) {
        res
            .status(404)
            .json({
                errorsMessages: [{
                    message: 'Video not found!',
                    field: 'id'
                }]
            })
        return
    }
    const errors = inputValidation(req.body)
    if (errors.errorsMessages && errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }
    const updatedVideo = {
        ...video,
        ...req.body,
        id: video.id,
        createdAt: video.createdAt,
        publicationDate: video.publicationDate,
    }

    db.videos = db.videos.map(v => v.id === +req.params.id ? updatedVideo : v)
    res
        .status(204)
        .send()
}