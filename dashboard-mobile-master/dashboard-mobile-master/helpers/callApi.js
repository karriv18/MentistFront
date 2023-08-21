import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
// axios.defaults.baseURL = 'https://my.fil-global.com/api'
axios.defaults.baseURL = 'http://172.10.10.25:81/api'
axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = "Bearer " + token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
export const callApi = async (method, url, data) => {
    return axios({
        method, url, data
    })
}


export default callApi;
