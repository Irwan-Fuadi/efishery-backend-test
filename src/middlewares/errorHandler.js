const httpStatus = require("http-status-codes")
const responseUtils = require("@utils/responseUtils")

module.exports = (err, req, res, next) => {
    switch (err.name) {
        case "Bad Request":
            res
                .status(400)
                .send(responseUtils.failed({ error: err.message, code: 400 }))
            break
        case "JsonWebTokenError":
            res
                .status(401)
                .send(responseUtils.failed({ error: err.message, code: 401 }))
            break
        case "Unauhtorized":
            res
                .status(401)
                .send(responseUtils.failed({ error: err.message, code: 401 }))
            break
        case "Not Found":
            res
                .status(404)
                .send(responseUtils.failed({ error: err.message, code: 404 }))
            break
        default:
            res
                .status(500)
                .send(responseUtils.failed({ error: err.message, code: 500 }))
    }
}