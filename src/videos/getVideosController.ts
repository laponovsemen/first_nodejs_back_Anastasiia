import {Router, Request, Response} from 'express'
import {db} from '../db/db'
import { createVideo } from './createVideo';
import { updateVideoF } from './updateVideo';


export const videoRouter = Router();
 
export const videoController = {
  getVideos: (req: Request, res: Response) => {
    const videos = db.videos 
    console.log('get all videos if exist')

    if (!videos.length) { 
      res.status(404).send('No videos found');
      return;
    }
    
    res.status(200).json(videos) 
  },
  createVideo: (req: Request, res: Response) =>  createVideo(req, res),
  deleteVideo: (req: Request, res: Response) => {
    const id = parseInt(req.params.id); 
    const index = db.videos.findIndex((video) => video.id === id); 

    if (index === -1 || !db.videos[index]) { 
      res.status(404).send('Video with this id not found'); 
      return;
    }
 
    db.videos.splice(index, 1); 
    res.status(204).send(); 
  },
  getVideo: (req: Request, res: Response) => {
    const id = parseInt(req.params.id); 
    const video = db.videos.find((video) => video.id === id); 
 
    if (!video) { 
      res.status(404).send('Video with this id not found'); 
      return;
    }
 
    res.status(200).json(video); 
  },
  updateVideo: (req: Request, res: Response) => updateVideoF(req, res),
  deleteAllVideos: (req: Request, res: Response) => {
    db.videos = []; 
    res.status(204).send();
  }
}

videoRouter.get("/", videoController.getVideos);
videoRouter.post("/", videoController.createVideo);
videoRouter.delete("/:id", videoController.deleteVideo);
videoRouter.get("/:id", videoController.getVideo);
videoRouter.put("/:id", videoController.updateVideo);