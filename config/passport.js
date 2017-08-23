const passport = require('passport');

module.exports = app => {

    //setando middleware passport
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    //strategies
    require('./strategies/googleStrategy')();
};
