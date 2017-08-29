const passport = require('passport');
const LinkedIn = require('passport-linkedin-oauth2').Strategy;
const User = require('../../models/userModel');

module.exports = () => {
    passport.use( new LinkedIn({
        clientID: '78emglj3012krm',
        clientSecret: 'PrRwUaQKdQMMndqV',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }, (accesstoken, refreshToken, profile, done) => {
        User.findOne({'linkedin.id': profile.id}, (err, x) => {
            if (x) return done(null, x);
            let user = {
                displayName: profile.displayName,
                image: profile._json.pictureUrl,
                email: profile.emailAddress,
                linkedin: {
                    id: profile.id
                }
            };
            User.create(user);
            done(null, user);
        });
    }));
};
