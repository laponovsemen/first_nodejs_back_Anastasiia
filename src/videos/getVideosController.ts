import {Router, Request, Response} from 'express'
import {db} from '../db/db'
import { createVideo } from './createVideo';

export const videoRouter = Router();
 
export const videoController = {
  getVideos: (req: Request, res: Response) => {
    const videos = db.videos 
    console.log('get all videos if exist')
    res.status(200).json(videos) 
  },
  createVideo: (req: Request, res: Response) =>  createVideo(req, res),
  deleteVideo: (req: Request, res: Response) => {
    const id = parseInt(req.params.id); 
    const index = db.videos.findIndex((video) => video.id === id); 
 
    if (index === -1) { 
      res.status(404).send('Video not found'); 
      return;
    }
 
    db.videos.splice(index, 1); 
    res.status(204).send(); 
  },
  deleteAllVideos: (req: Request, res: Response) => {
    db.videos = []; 
    res.status(204).send();
  }
}

videoRouter.get("/", videoController.getVideos);
videoRouter.post("/", videoController.createVideo);