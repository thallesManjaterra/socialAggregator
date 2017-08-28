const passport = require('passport');
const LinkedIn = require('passport-linkedin-oauth2').Strategy;

module.exports = () => {
    passport.use( new LinkedIn({
        clientID: '78emglj3012krm',
        clientSecret: 'PrRwUaQKdQMMndqV',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile']
    }, (accesstoken, refreshToken, profile, done) => {
        let user = {
            displayName: profile.displayName,
            image: profile._json.pictureUrl,
            email: profile.emailAddress
            linkedin: {
                id: profile.id,
                token: accessToken
            }

        }
        done(null, profile);
    }));
};
