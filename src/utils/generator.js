const moment = require('moment');

module.exports = {
    getLocalTime: async() => {
        return moment()
            .tz("Asia/Jakarta")
            .format();
    },

    randomStr: (length) => {
        let s = '';
        while (s.length < length) s += Math.random().toString(36).substr(2, length - s.length);
        return s;
    },

    isJson: (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    },

    isEmptyObj: (obj) => {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    },

    extractString: (str, param) => {
        return str.length > 0 ? str.substr(0, str.indexOf(param)) : null;
    },

    cleanArrayObject: (obj) => {
        const newObj = Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : (a[k] = v, a)), {});
        return newObj;
    },

    parseStringifyData: (data) => {
        return JSON.parse(JSON.stringify(data))
    }
}