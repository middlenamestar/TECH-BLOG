const router = require('express').Router();

// home page.
router.get('/', async (req, res) => {
    try {
        // res.render('home');
        res.json('all posts♡')
    } catch (err) {
        res.json('uh oh. error');
    }
});

module.exports = router;