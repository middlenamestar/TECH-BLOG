// 📬

const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// NEW POST. where the data from form is going to be sent: localhost:3001/post
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newPost = await Post.create({...body, user_id: req.session.userId});
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// EDIT/UPDATE POST. localhost:3001/post/5
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = await Post.update(req.body, {where: {id: req.params.id}});
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE POST localhost:3001/post/5
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [affectedRows] = Post.destroy({where: {id: req.params.id}});
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;