const passport = require('passport');
const User = require('../../models/userModel');

module.exports = () => {
    //utilizando google strategy
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new GoogleStrategy({
        clientID: '570275349633-j4ls7ejknb282vtqu3dse9g3le0m7pr7.apps.googleusercontent.com',
        clientSecret: 'VCk3fBK-aJJakKYllwapWBaB',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },(accessToken, refreshToken, profile, done) => {
        User.findOne({'google.id': profile.id}, (err, x) => {
            if (x) return done(null, x);
            let user = {
                email: profile.emails[0].value,
                image: profile._json.image.url,
                displayName: profile.displayName,
                google: {
                    id: profile.id
                }
            };
            User.create(user);
            return done(null, user);
        });
    }));
};
