import axios from 'axios';

const request = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
});

export const fetchIdsByType = (type) => request.get(`${type}stories.json$`);
