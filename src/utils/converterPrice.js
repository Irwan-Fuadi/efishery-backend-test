const axios = require('axios');
const nodeCache = require('node-cache');
const cache = new nodeCache({ stdTTL: 0 });

const URL_CONVERTER = process.env.URL_CONVERTER
const API_KEY_CONVERTER = process.env.API_KEY_CONVERTER
const CACHE_KEY = process.env.CACHE_KEY

module.exports = {
    getUSD: async() => {
        var idrUSD = 0;

        if (cache.has(CACHE_KEY)) {
            return cache.get(CACHE_KEY)
        }

        var resultConverter = await axios.get(`${URL_CONVERTER}${API_KEY_CONVERTER}`);
        resultConverter = resultConverter.data;
        idrUSD = resultConverter.USD_IDR;
        cache.set(CACHE_KEY, idrUSD);

        return idrUSD
    }
}