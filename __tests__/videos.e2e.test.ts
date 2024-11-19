import {req} from './test-helpers'
import {db, setDB, DBType} from '../src/db/db'
import {dataset1} from './datasets'
import {SETTINGS} from '../src/settings'
import { InputVideoType, Resolutions } from '../src/input-output-types/video-types'
import { VideoDBType } from '../src/db/video-db-type'
 
describe(SETTINGS.PATH.BASE + '/', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()
    })
 
    it('should get empty array', async () => {
        setDB() // очистка базы данных если нужно
 
        const res = await req
            .get(SETTINGS.PATH.BASE + '/')
            .expect(200) // проверяем наличие эндпоинта
 
        console.log(res.body) // можно посмотреть ответ эндпоинта
 
        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })
    it('should get not empty array', async () => {
        setDB(dataset1) // заполнение базы данных начальными данными если нужно
 
        const res = await req
            .get(SETTINGS.PATH.BASE + '/')
            .expect(200)

        expect(res.body.length).toBe(1)
        expect(res.body[0]).toEqual(dataset1.videos[0])
    })
    it('should create video', async () => {
        setDB() // очистка базы данных если нужно
 
        const video: InputVideoType = {
            title: 'some title',
            author: 'some author',
            availableResolutions: [Resolutions.P240, Resolutions.P360],
        }

        const res = await req
            .post(SETTINGS.PATH.BASE + '/')
            .send(video)
            .expect(201)
        
        expect(res.body.title).toBe(video.title)
        expect(res.body.author).toBe(video.author)
        expect(res.body.availableResolutions).toEqual(video.availableResolutions)
    })
    it('should not create video', async () => {
        setDB() // очистка базы данных если нужно
 
        const video: InputVideoType = {
            title: 'some title',
            author: '',
            availableResolutions: [Resolutions.P360],
        }

        const res = await req
            .post(SETTINGS.PATH.BASE + '/')
            .send(video)
            .expect(400)
        
        expect(res.body.errorsMessages.length).toBe(1)
        expect(res.body.errorsMessages[0].field).toBe('author')
    })
    it('should update video', async () => {
        const videosDB: DBType = {
            videos: [{
                title: 'some title',
                author: 'some author',
                availableResolutions: [Resolutions.P240, Resolutions.P360],
                id: 118,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: new Date().toISOString(),
                publicationDate: new Date().toISOString(),
            }]
        }
        const videoId = videosDB.videos[0].id
        setDB(videosDB) // заполнение базы данных начальными данными если нужно
    

        const updateVideo: Partial<VideoDBType> = {
            title: 'New title',
            author: 'some author',
            availableResolutions: [Resolutions.P240, Resolutions.P360],
            canBeDownloaded: false,
            minAgeRestriction: 18,
        }

        const res = await req
            .put(`${SETTINGS.PATH.BASE}/${videoId}`)
            .send(updateVideo)
            .expect(204)
        
        expect(db.videos[0].title).toBe(updateVideo.title)
        expect(db.videos[0].minAgeRestriction).toBe(updateVideo.minAgeRestriction)
    })
})