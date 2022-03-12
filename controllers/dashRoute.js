const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// localhost:3001/my-dash
router.get('/', withAuth, async (req, res) => {
    try {
        const posts = await Post.findAll({ where: {user_id: req.session.userId} });
        const post = posts.map((el) => el.get({plain: true}));
        // console.log(post);
        const loggedIn = req.session.loggedIn;
        res.render('my-dash', {post, loggedIn});
    } catch (err) {
        // REDIRECT HOME FOR NOW.
        res.redirect('/');
    }
});

// ROUTE for NEW POST. localhost:3001/my-dashboard/new
router.get('/new', withAuth, (req, res) => {
    const loggedIn = req.session.loggedIn;
    res.render('new-post', {loggedIn});
});

// edit post. localhost:3001/my-dashboard/edit/2
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        id = req.params.id;
        const posts = await Post.findOne({where: {id}});
        const post = posts.get({plain: true});
        const loggedIn = req.session.loggedIn;
        res.render('edit', {post, loggedIn})
    } catch (err) {
        res.redirect('/');
    }
});

module.exports = router;