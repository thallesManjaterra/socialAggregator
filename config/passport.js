const passport = require('passport');
const User = require('../models/userModel');

module.exports = app => {

    //setando middleware passport
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, x) => done(null, x));
    });

    //strategies
    require('./strategies/google')(passport, User);
    require('./strategies/twitter')(passport, User);
    require('./strategies/facebook')(passport, User);
    require('./strategies/github')(passport, User);
    require('./strategies/linkedIn')(passport, User);
};
