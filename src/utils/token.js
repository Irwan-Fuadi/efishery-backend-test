const jwt = require('jsonwebtoken');

const AUTH_TOKEN_EXPIRATION = process.env.AUTH_TOKEN_EXPIRATION || "5m"
const SECRET_KEY = process.env.SECRET_KEY || 'BEeFishery'


module.exports = {
    decoderJWT: (token) => {
        try {
            return jwt.verify(token, SECRET_KEY, { algorithm: 'HS256' });
        } catch (err) {
            if (err.expiredAt) return 401
                // console.log(`DECODER ERROR ==> ${err.message}`)
            return null
        }
    },

    encoderJWT: (payload) => {
        try {
            payload = {
                ...payload,
                expired: AUTH_TOKEN_EXPIRATION
            }

            return jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256', expiresIn: AUTH_TOKEN_EXPIRATION })
        } catch (err) {
            // console.log(`ENCODER ERROR ==> ${err.message}`)
            return null
        }
    }
}