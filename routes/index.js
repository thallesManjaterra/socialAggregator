const router = require('express').Router();

router.route('/')
    .get((req, res) => {
        res.render('index', {app: 'socialAggregator'});
    });

module.exports = router;
