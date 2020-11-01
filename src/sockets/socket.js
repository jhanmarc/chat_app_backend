const { io } = require('../index')


io.on('connection', client => {
    console.log('Client connect');

    client.on('disconnect', () => {
        console.log("Client connect");
    })
});