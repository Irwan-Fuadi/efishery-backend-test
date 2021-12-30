'use strict';

let resFormat;

module.exports = {
    success: function({ message = "Success", data = null, code = 200, metta = null }) {
        return {
            message: message,
            data: data,
            code: code,
            metta: metta,
            success: true
        }
    },

    failed: function({ error = null, code = 400, metta = null }) {
        return {
            error: error,
            code: code,
            metta: metta,
            success: false
        }
    },
}