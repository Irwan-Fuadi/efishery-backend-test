# eFishery Backend Test

### BUILT WITH

### Auth App
* [NodeJs / NPM](https://www.npmjs.com/)
* [ExpressJS](https://github.com/expressjs/express)
* [module-alias](https://www.npmjs.com/package/module-alias)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [axios](https://www.npmjs.com/package/axios)
* [node-cache](https://www.npmjs.com/package/node-cache)

### Fetch App
* [Python](https://www.python.org/)(v3.8)
* [FastAPI](https://github.com/tiangolo/fastapi)
* [Uvicorn](https://github.com/encode/uvicorn)
* [Python-dotenv](https://github.com/theskumar/python-dotenv)
* [Requests](https://github.com/psf/requests)
* [PyJWT](https://github.com/jpadilla/pyjwt)

## GETTING STARTED

Clone this project
```
git clone https://github.com/Irwan-Fuadi/efishery-backend-test.git
```

## INSTALATION

### Auth App

Go to directory

rename .envNODE to .env

then install package needed

```bash
npm install
```

### Fetch App

Go to directory

Create virtual environment

```bash
python -m venv env
```

Activate virtual environment
WSL/Linux:

```bash
source env/bin/activate
```

Windows:

```bash
env\Scripts\activate
```

Install requirements

```bash
pip install -r requirements.txt
```

rename .envPYTHON to .env


## RUNNING

### Auth App

```bash
npm start
```

Check API is alive:</br>
http://localhost:port/api/v1/auth/alive


### Fetch App

```bash
python main.py
```
Check API is alive:</br>
http://localhost:port/api/v1/fetch/alive



## DIAGRAM

### Context Diagram

![Context Diagram](https://github.com/Irwan-Fuadi/efishery-backend-test/blob/master/Context%20Diagram.png?raw=true)

### Deployment Diagram

![Deployment Diagram](https://github.com/Irwan-Fuadi/efishery-backend-test/blob/master/Deployment%20Diagram.png?raw=true)
