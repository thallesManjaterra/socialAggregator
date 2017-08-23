const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

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

//autenticação
//setando middleware express-session
app.use(session({
    secret: 'algumaCoisa',
    resave: true,
    saveUninitialized: true
}));
//setando middleware passport
app.use(passport.initialize());
app.use(passport.session());

//utilizando google strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: '570275349633-j4ls7ejknb282vtqu3dse9g3le0m7pr7.apps.googleusercontent.com',
    clientSecret: 'VCk3fBK-aJJakKYllwapWBaB',
    callbackURL: 'http://localhost:3000/auth/google/callback'
},(req, accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

//rotas
app.use('/', require('../routes/index'));
app.use('/auth', require('../routes/auth'));
app.use('/users', require('../routes/users'));

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
