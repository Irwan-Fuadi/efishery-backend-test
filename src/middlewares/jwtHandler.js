"use script";

const tokenUtils = require('@utils/token')
const responseUtils = require('@utils/responseUtils')

module.exports = {
    verify: (req, res, next) => {
        try {
            if (!req.headers.authorization)
                return res.status(403).send({ authorization: false, message: 'Access Forbidden' })

            const token = req.headers.authorization;
            const decode = tokenUtils.decoderJWT(token)

            if (!decode)
                return res.status(403).send({ authorization: false, message: 'Access Forbidden' })

            if (decode == 401) throw new Error()

            req.private_claims = decode
            return next()
        } catch (err) {
            return res.status(401).send(responseUtils.failed({ error: "Expired token", code: 401 }))
        }
    }
}