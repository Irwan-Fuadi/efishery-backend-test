"use strict"

const router = require("express").Router();

const routerList = {
    "auth": "auth/authAPI",
    "fetch": "fetch/fetchAPI"
}

for (let item in routerList) {
    router.use(
        "/" + item,
        require("../../src/components/" + routerList[item])
    )
}

module.exports = router