const { Router } = require('express')
const apiRoute = Router()

//imports routes
const AuthRoute = require('./auth.routes')

apiRoute.use('/auth', AuthRoute)

module.exports = apiRoute