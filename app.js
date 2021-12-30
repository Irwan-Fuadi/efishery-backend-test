require("module-alias/register")
const createError = require("http-errors")
const globalVar = require("./src/utils/globalVariable")

var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors");
var bodyParser = require("body-parser");

var indexRouter = require("./src/components/index")
var errorHandler = require("./src/middlewares/errorHandler")

var app = express()
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "./public")))
app.options("*", cors())

var whitelist = ["*"]
const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(null, true)
        }
    },

    allowedHeaders: "Content-Type,Authorization,Access-Control-Allow-Origin,Authenticate,username,password",
    preflightContinue: true,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(globalVar.getEndPoint(), indexRouter)
app.use(globalVar.getPath(), indexRouter)
app.use(errorHandler)

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === "/favicon.ico") {
        res.status(204).json({ nope: true })
    } else {
        next()
    }
}

app.use(ignoreFavicon)
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*")

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    )

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type",
        "Content-Type,Authorization",
        "Access-Control-Allow-Origin",
        "Authenticate",
        "platform",
        "username",
        "password"
    )

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true)

    // Pass to next layer of middleware
    next()
})

app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
})

console.log(`App is starting`)

module.exports = app