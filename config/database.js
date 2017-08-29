const mongoose = require('mongoose');

module.exports = uri => {
    mongoose.connect(uri, {useMongoClient: true});
    mongoose.connection.on('connected', () => {
        console.log(`Mongoose - conectado em ${uri}`);
    });
    mongoose.connection.on('disconnected', () => {
        console.log(`Mongoose - disconectado de ${uri}`);
    });
    mongoose.connection.on('error', err => {
        console.log('Mongoose - Erro na conexão: ${err}');
    });
    process.on('SIGINT', () => {
        console.log('Mongoose - Desconectado pelo término da aplicação!');
        process.exit(0);
    });
};
