const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// localhost:3001/my-dash
router.get('/', withAuth, async (req, res) => {
    try {
        const posts = await Post.findAll({ where: {user_id: req.session.userId} });
        const post = posts.map((el) => el.get({plain: true}));
        res.render('my-dash', {post});
    } catch (err) {
        // REDIRECT HOME FOR NOW.
        res.redirect('/');
    }
});

// ROUTE for NEW POST. localhost:3001/my-dashboard/new
router.get('/new', withAuth, (req, res) => {
    res.render('new-post');
});

// edit post. localhost:3001/my-dashboard/edit/2
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        id = req.params.id;
        const posts = await Post.findOne({where: {id}});
        const post = posts.get({plain: true});
        res.render('edit', {post})
    } catch (err) {
        res.redirect('/');
    }
});

module.exports = router;