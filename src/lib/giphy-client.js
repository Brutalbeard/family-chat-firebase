import axios from 'axios'

export const giphy_client = axios.create({
    baseURL: 'http://api.giphy.com/v1/gifs/',
    params: {
        api_key: process.env.REACT_APP_GIPHY_KEY,
    }
})

export default giphy_client;