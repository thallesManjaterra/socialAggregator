const router = require('express').Router();

router.use('/', (req, res, next) => {
    if (!req.user) {
        res.redirect('/');
    }
    next();
});

router.get('/', (req, res) => {
    res.render('users', {
        user: {
            nome: req.user.displayName,
            img: req.user.image
        }
    });
});

module.exports = router;
