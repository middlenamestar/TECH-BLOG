const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// home page. all posts. localhost:3001
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [User],
        });
        const post = posts.map((el) => el.get({ plain: true }));
        // console.log(post);
        const loggedIn = req.session.loggedIn;
        res.render('home', {post, loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});

// get route for single post. localhost:3001/post/1
router.get('/post/:id', async (req, res) => {
    try {
        id = req.params.id;
        const posts = await Post.findOne({where: {id},
            include: [
                User,
                {model: Comment, include: [User]}
            ]
        });
        const post = posts.get({plain: true});
        // console.log(post.comments);
        const loggedIn = req.session.loggedIn;
        res.render('individual-post', {post, loggedIn})
    } catch (err) {
        res.status(500).json(err);
    }
});

// login page w/ form. localhost:3001/login
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //   res.redirect('/my-dash');
    //   return;
    // }
    const loggedIn = req.session.loggedIn;
    res.render('login', {loggedIn});
});

// signup page w/ form. localhost:3001/signup
router.get('/signup', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    const loggedIn = req.session.loggedIn;
    res.render('signup', {loggedIn});
});

module.exports = router;