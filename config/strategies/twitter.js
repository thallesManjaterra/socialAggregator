const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = () => {
    passport.use(new TwitterStrategy({
        consumerKey: 'FD2r4Ibi3ir1t9L6jwoD5yj8T',
        consumerSecret: 'TkCIPQtBsnoFCLsa1XLByM8cMsbXhSjfblPVkaTdu6TmkQ4n2N',
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true
    }, (req, accessToken, tokenSecret, profile, done) => {
        let user = {
            image: profile._json.profile_image_url,
            displayName: profile.displayName,
            twitter: {
                id: profile.id,
                token: accessToken
            }
        };
        done(null, user);
    }));
};
