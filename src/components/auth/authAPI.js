const route = require('express').Router();
const services = require('./authService');
const responseUtils = require('@utils/responseUtils')
const { verify } = require('../../middlewares/jwtHandler');

route.get('/alive', async(req, res, next) => {
    res
        .status(200)
        .send("Alive")
});

route.post('/register', async(req, res, next) => {
    await services.register(req, (error, result) => {
        if (error) {
            next(error)
        } else {
            res
                .status(200)
                .send(responseUtils.success({ data: result }))
        }
    })
});

route.post('/login', async(req, res, next) => {
    await services.login(req, (error, result) => {
        if (error) {
            next(error)
        } else {
            res
                .status(200)
                .send(responseUtils.success({ data: result }))
        }
    })
});

route.get('/private', verify, async(req, res, next) => {

    var result = {}
    if (req.private_claims) {
        delete req.private_claims.iat;
        delete req.private_claims.exp;
        delete req.private_claims.expired;

        result = req.private_claims
    }

    res
        .status(200)
        .send(responseUtils.success({ data: result }))
});


module.exports = route;