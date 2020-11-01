const { io } = require('../index')

const jwt = require('../middleware/jwt')

const scc = require('../controllers/socket.controller')


io.on('connection', async (client) => {
    // console.log('Client connect');

    // console.log();
    const [ valido, uid ] = jwt.verifySocketToken(client.handshake.headers['x-token'])
    if(!valido) { return client.disconnect() }

    await scc.userConnect( uid )


    client.on('disconnect', async () => {
        console.log("Client disconnect");
        await scc.userDisconnect( uid )
    })
});