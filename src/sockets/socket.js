const { io } = require('../index')

const jwt = require('../middleware/jwt')

const scc = require('../controllers/socket.controller')


io.on('connection', async (client) => {
    // console.log('Client connect');

    // console.log();
    const [ valido, uid ] = jwt.verifySocketToken(client.handshake.headers['x-token'])
    if(!valido) { return client.disconnect() }

    // Cliente  autenticado
    await scc.userConnect( uid )

    //Ingresar al usuario a una sala en particular

    client.join( uid );

    client.on('message-personal', async (payload) => {
        await scc.saveMessage(payload)
        io.to( payload.to ).emit('message-personal', payload)
    })


    client.on('disconnect', async () => {
        await scc.userDisconnect( uid )
    })
});