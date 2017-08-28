const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.use(new FacebookStrategy({
        clientID: '1406530956062012',
        clientSecret: '4ddf0385e45618db6863b4ce2d1b2dfb',
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true,
        profileFields: ['id', 'emails', 'displayName', 'picture']
    }, (req, accessToken, refreshToken, profile, done) => {
        let user = {
            displayName: profile.displayName,
            email: profile._json.email,
            image: profile._json.picture.data.url,
            facebook: {
                id: profile._json.id,
                token: accessToken
            }
        }
        done(null, user);
    }));
};