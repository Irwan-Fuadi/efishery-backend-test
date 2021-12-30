'use script';

const generatorUtils = require('@utils/generator')
const fileUtils = require('@utils/file');
const tokenUtils = require('@utils/token');

module.exports = {
    register: async(req, cb) => {
        try {
            const body = req.body;

            if ((!body.name || body.name.length === 0) || (!body.phone || body.phone.length === 0)) {
                throw { name: 'Bad Request', message: 'Please Check Your Data' }
            }

            const isExist = await fileUtils.findData('users', 'phone', body.phone)

            if (isExist) throw { name: 'Bad Request', message: 'User Already Exist' }

            var payloadUser = {
                phone: body.phone,
                name: body.name,
                password: generatorUtils.randomStr(4).toUpperCase(),
                role: body.role || 'user',
                created_at: Date.now()
            }

            const result = await fileUtils.saveData('users', payloadUser)

            return cb(null, result)
        } catch (err) {
            // console.log(`CREATE USER ERROR ==> ${err.message}`)
            return cb(err)
        }
    },

    login: async(req, cb) => {
        try {
            const body = req.body;

            if ((!body.password || body.password.length === 0) || (!body.phone || body.phone.length === 0)) {
                throw { name: 'Bad Request', message: 'Please Check Your Data' }
            }

            const user = await fileUtils.findData('users', 'phone', body.phone)

            if (!user) throw { name: 'Bad Request', message: 'User Doesn\'t Exist' }

            if (user.password != body.password) throw { name: 'Bad Request', message: 'Invalid Password' }

            var token = tokenUtils.encoderJWT(user)

            var result = {
                name: user.name,
                phone: user.phone,
                access_token: token
            };

            return cb(null, result)
        } catch (err) {
            // console.log(`LOGIN USER ERROR ==> ${err.message}`)
            return cb(err)
        }
    }
}