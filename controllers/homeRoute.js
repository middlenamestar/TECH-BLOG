const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// home page. all posts.
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

// get route for single post.
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

module.exports = router;