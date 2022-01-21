const express = require('express')
var cors = require('cors')
const path = require('path')
// var oas3Tools = require('oas3-tools')
const app = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./openapi/openapi.yaml')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const userRouter = require('./routes/users')
const projectsRouter = require('./routes/projects')

logger.info('conntecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to db')
  })
  .catch(error => {
    console.log('error connecting to db', error)
  })


app.use(cors())

const allowCrossDomain = function(req, res, next) {
  let origin = 'http://localhost'
  if (
    req.get('origin') && (
      req.get('origin').startsWith('http://localhost')
    )
  ) {
    origin = req.headers.origin
  }
  res.header('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])
  res.header('Access-Control-Allow-Headers', ['Content-Type', 'Authorization'])
  res.header('Access-Control-Allow-Credentials', 'true')

  if ('OPTIONS' === req.method) {
    return res.sendStatus(200)
  }

  next()
}

app.use(allowCrossDomain)

var options = {
  routing: {
    controllers: path.join(__dirname, './controllers')
  },
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))
// app.use('/users', require('./routes/users'))
// app.use('/startups', require('./routes/startups'))

// Make use of the middleware
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

// Make use of the API Endpoints
app.use('/api/',userRouter)
app.use('/api/',projectsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app