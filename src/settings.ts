import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env
 
export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    PATH: {
        BASE: '/hometask_01/api',
        VIDEOS: '/videos',
        SPECIFIC_VIDEO: '/videos/:id',
        DELETE_ALL: '/testing/all-data',
    },
} 