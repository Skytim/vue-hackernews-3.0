import axios from 'axios';

const request = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
});

export const fetchIdsByType = (type) => request.get(`${type}stories.json`);

export const fetchItemById = (id) => request.get(`item/${id}.json`);

export const fetchItems = async function (ids) {
    let promiseList = [];
    for (let id of ids) {
        promiseList.push(fetchItemById(id))
    }
    return Promise.all(promiseList)
}