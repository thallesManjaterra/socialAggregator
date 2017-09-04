const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = (passport, User) => {
    passport.use(new TwitterStrategy({
        consumerKey: 'FD2r4Ibi3ir1t9L6jwoD5yj8T',
        consumerSecret: 'TkCIPQtBsnoFCLsa1XLByM8cMsbXhSjfblPVkaTdu6TmkQ4n2N',
        callbackURL: 'http://localhost:3000/auth/twitter/callback',
        passReqToCallback: true
    }, (req, accessToken, tokenSecret, profile, done) => {
        User.findOne({'twitter.id': profile.id}, (err, x) => {
            if (x) return done(null, x);
            let user = {
                image: profile._json.profile_image_url,
                displayName: profile.displayName,
                twitter: {
                    id: profile.id
                }
            };
            User.create(user, (err, x) => done(null, x));
        });
    }));
};
