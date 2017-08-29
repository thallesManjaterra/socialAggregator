const passport = require('passport');
const User = require('../../models/userModel');

const GitHubStrategy = require('passport-github').Strategy;

module.exports = () => {
    passport.use(new GitHubStrategy({
        clientID: 'e2c99297f0838dba86a1',
        clientSecret: 'ffed8a9fc742e86e87006cefbf18411461e1baf0',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({'github.id': profile.id}, (err, x) => {
            if (x) return done(null, x);
            let user = {
                displayName: profile.displayName,
                login: profile.username,
                image: profile._json.avatar_url,
                email: profile.emails[0].value,
                github: {
                    id: profile.id
                }
            };
            User.create(user);
            return done(null, user);
        });
    }));
};
