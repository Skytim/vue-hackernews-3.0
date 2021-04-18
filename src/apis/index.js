import axios from 'axios';

const request = axios.create({
    baseURL: 'https://hacker-news.firebaseio.com/v0/'
});

export const fetchIdsByType = (type) => request.get(`${type}stories.json`);

export const fetchItemById = (id) => request.get(`item/${id}.json`).then(res => {
    let data = res.data;
    data.__lastUpdated =  new Date();
    return data;
});

export const fetchUser = (id) => request.get(`user/${id}.json`);

export const fetchItems = async function (ids) {
    let promiseList = [];
    for (let id of ids) {
        promiseList.push(fetchItemById(id))
    }
    return Promise.allSettled(promiseList)
}