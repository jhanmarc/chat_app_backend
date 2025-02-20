const mongoose = require('mongoose')

const dbConnetion = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB ONLINE');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en base de datos')
    }
}

module.exports = {
    dbConnetion
}