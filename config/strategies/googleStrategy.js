const passport = require('passport');

module.exports = () => {
    //utilizando google strategy
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new GoogleStrategy({
        clientID: '570275349633-j4ls7ejknb282vtqu3dse9g3le0m7pr7.apps.googleusercontent.com',
        clientSecret: 'VCk3fBK-aJJakKYllwapWBaB',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },(req, accessToken, refreshToken, profile, done) => {
        done(null, profile);
    }));
};
