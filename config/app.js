const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//instância express
const app = express();

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));
app.use('/css', express.static('./node_modules/bootstrap-social')); //Social Sign-In Buttons made in pure CSS based on Bootstrap and Font Awesome
app.use(express.static('./node_modules/font-awesome'));
app.use('/js', express.static('./node_modules/jquery/dist'));

//rotas
app.use('/', require('../routes/index'));

//variáveis de ambiente
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 4);

//pegando rotas 'Not found' e passando para error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {error: err});
});

//exportando instância configurada do express
module.exports = app;
