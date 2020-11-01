const express = require('express')
require('dotenv').config();

// start db
require('./database/config').dbConnetion()

//
const Routers= require('./routes')

const app = express();
app.use(express.json())

app.use('/api', Routers)

// node server
const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)
require('./sockets/socket')

server.listen(process.env.PORT, () => {
    console.log('Server start on port', process.env.PORT);
})