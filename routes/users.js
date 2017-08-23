const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('users', {
        user: {
            nome: req.user.displayName,
            img: req.user._json.image.url
        }
    });
});

module.exports = router;
