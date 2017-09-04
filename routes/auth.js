const router = require('express').Router();
const passport = require('passport');

router.route('/logout')
    .get((req, res) => {
        req.logout();
        res.redirect('/');
    });

//google
router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/users',
        failure: '/error'
    }));
router.route('/google')
    .get(passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

//twiiter
router.route('/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect: '/users',
        failure: '/error'
    }));
router.route('/twitter')
    .get(passport.authenticate('twitter'));

//facebook
router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/users',
        failure: '/error'
    }));
router.route('/facebook')
    .get(passport.authenticate('facebook'));

//github
router.route('/github/callback')
    .get(passport.authenticate('github', {
        successRedirect: '/users',
        failure: '/error'
    }));
router.route('/github')
        .get(passport.authenticate('github'));

//linkedin
router.route('/linkedin/callback')
    .get(passport.authenticate('linkedin', {
        successRedirect: '/users',
        failure: '/error'
    }));
router.route('/linkedin')
    .get(passport.authenticate('linkedin'));

module.exports = router;
