'use script';

const axios = require('axios');
const generatorUtils = require('@utils/generator');
const fileUtils = require('@utils/file');
const converterPriceUtils = require('@utils/converterPrice');

const scrapeResource = async() => {
    try {
        const USD = await converterPriceUtils.getUSD();
        var resultResouce = await axios.get(`${process.env.URL_RESOURCE}`);
        resultResouce = resultResouce.data;

        resultResouce = resultResouce.filter((item, idx) => {
            if (item.area_provinsi != null) {
                if (item.uuid != null) {
                    item.price = parseFloat(item.price)
                    item.price_usd = parseFloat(item.price * parseFloat(USD))
                    return item
                }
            }
        })

        return resultResouce
    } catch (err) {
        console.log(`SCRAPE RESOURCE ERROR ==> ${err.message}`)
        return null;
    }
}

module.exports = {
    list: async(req, cb) => {
        try {
            const result = await scrapeResource();

            return cb(null, result)
        } catch (err) {
            console.log(`FETCH LIST ERROR ==> ${err.message}`)
            return cb(err)
        }
    },

    aggregate: async(req, cb) => {
        try {
            var users = req.private_claims;

            if (users.role !== 'admin') throw { name: "Forbidden", message: "You don't have access" }

            var resource = await scrapeResource();

            var result = resource.reduce((acc, value) => {
                if (!acc[value.area_provinsi]) {
                    acc[value.area_provinsi] = [];
                }

                acc[value.area_provinsi].push(value);

                return acc;
            }, {});

            return cb(null, result)
        } catch (err) {
            console.log(`FETCH AGGREGATE ERROR ==> ${err.message}`)
            return cb(err)
        }
    }
}