import {req} from './test-helpers'
import {setDB} from '../src/db/db'
import {dataset1} from './datasets'
import {SETTINGS} from '../src/settings'
import { InputVideoType, Resolutions } from '../src/input-output-types/video-types'
 
describe(SETTINGS.PATH.BASE + SETTINGS.PATH.VIDEOS, () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB()
    })
 
    it('should get empty array', async () => {
        setDB() // очистка базы данных если нужно
 
        const res = await req
            .get(SETTINGS.PATH.BASE + SETTINGS.PATH.VIDEOS)
            .expect(200) // проверяем наличие эндпоинта
 
        console.log(res.body) // можно посмотреть ответ эндпоинта
 
        expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    })
    it('should get not empty array', async () => {
        setDB(dataset1) // заполнение базы данных начальными данными если нужно
 
        const res = await req
            .get(SETTINGS.PATH.BASE + SETTINGS.PATH.VIDEOS)
            .expect(200)
 
        console.log(res.body)
 
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
            .post(SETTINGS.PATH.BASE + SETTINGS.PATH.VIDEOS)
            .send(video)
            .expect(201)
        
        console.log(res.body)

        expect(res.body.title).toBe(video.title)
        expect(res.body.author).toBe(video.author)
        expect(res.body.availableResolutions).toEqual(video.availableResolutions)
    })

})