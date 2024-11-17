import {Router, Request, Response} from 'express'
import {db} from '../db/db'
import { SETTINGS } from '../settings';
import { createVideo } from './createVideo';

export const videoRouter = Router();
 
export const videoController = {
  getVideos: (req: Request, res: Response) => {
    const videos = db.videos // получаем видео из базы данных
 
    res.status(200).json(videos) // отдаём видео в качестве ответа
  },
  createVideo: (req: Request, res: Response) =>  createVideo(req, res),
  deleteVideo: (req: Request, res: Response) => {
    const id = parseInt(req.params.id); // получаем id видео из запроса
    const index = db.videos.findIndex((video) => video.id === id); // ищем индекс видео в базе данных
 
    if (index === -1) { // если видео не найдено
      res.status(404).send('Video not found'); // отдаём ошибку
      return;
    }
 
    db.videos.splice(index, 1); // удаляем видео из базы данных
    res.status(204).send(); // отдаём пустой ответ
  }
}

videoRouter.get(SETTINGS.PATH.VIDEOS, videoController.getVideos);
videoRouter.post(SETTINGS.PATH.VIDEOS, videoController.createVideo);
videoRouter.delete(SETTINGS.PATH.DELETE_ALL, videoController.deleteVideo);