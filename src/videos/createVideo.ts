import {Response, Request} from 'express'
import {OutputErrorsType} from '../input-output-types/output-errors-type'
import {db} from '../db/db'
import {InputVideoType, Resolutions} from '../input-output-types/video-types'
import {VideoDBType} from '../db/video-db-type'
 
const inputValidation = (video: InputVideoType) => {
  const errors: OutputErrorsType = {
    errorsMessages: []
  };

  if (!video.title || video.title.length > 40) {
      errors.errorsMessages?.push({
          message: 'Title is required and should not exceed 40 characters!',
          field: 'title'
      });
  }

  if (!video.author || video.author.length > 20) {
      errors.errorsMessages?.push({
          message: 'Author is required and should not exceed 20 characters!',
          field: 'author'
      });
  }

  if (!Array.isArray(video.availableResolutions) || video.availableResolutions.length === 0 ||
      video.availableResolutions.some(r => !Object.values(Resolutions).includes(r))
  ) {
      errors.errorsMessages?.push({
          message: 'Invalid resolution! At least one valid resolution should be added.',
          field: 'availableResolutions'
      });
  }
      return errors
}
 
export const createVideo = (req: Request<any, any, InputVideoType>, res: Response< VideoDBType | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages && errors.errorsMessages.length) {
        res
            .status(400)
            .json(errors)
        return
    }
    const newVideo: VideoDBType = {
        ...req.body,
        id: Date.now() + Math.random(),
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        canBeDownloaded: true,
        minAgeRestriction: null,
    }
    db.videos = [...db.videos, newVideo]
 
    res
        .status(201)
        .json(newVideo)
}