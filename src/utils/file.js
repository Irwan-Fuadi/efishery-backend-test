const fs = require('fs');
const path = require('path')

const FILENAME = process.env.DBFILE_NAME || 'db.json'
const DIRFILE = '../../data/'
const FILE = `${DIRFILE}${FILENAME}`

const saveData = async(table, payload) => {
    const JSONFILE = path.join(__dirname, FILE)

    fs.readFile(JSONFILE, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            data = JSON.parse(data)
            data[table].push(payload)

            var jsonPayload = JSON.stringify(data, null, 2)
            fs.writeFile(JSONFILE, jsonPayload, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return
                }
            })
        }
    })

    return payload
}

const findData = async(table, field, key) => {
    const JSONFILE = path.join(__dirname, FILE)

    var data = await JSON.parse(fs.readFileSync(JSONFILE, 'utf8'))

    var result = null
    if (data) {
        data[table].forEach((item) => {
            if (item[field] == key) {
                result = item
            }
        })
    }

    return result
}

module.exports = {
    saveData,
    findData
}