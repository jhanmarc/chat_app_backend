const { Router } = require('express')
const apiRoute = Router()


const verifyTJWT = require('../middleware/jwt')

//imports routes
const AuthRoute = require('./auth.routes')
const UserRoute = require('./users.routes')

apiRoute.use('/auth', AuthRoute)
apiRoute.use('/user', verifyTJWT.verifyToken, UserRoute)

module.exports = apiRoute