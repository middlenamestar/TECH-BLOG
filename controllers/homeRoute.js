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
        res.render('home', {post});
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
        console.log(post);
        res.render('individual-post', {post})
    } catch (err) {
        res.status(500).json(err);
    }
});

// U must log in first! localhost:3001/you-must-login-firrst. Locked page!
router.get('/you-must-login-firrst', (req, res) => {
    res.render('locked');
});

// login page. localhost:3001/login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

module.exports = router;