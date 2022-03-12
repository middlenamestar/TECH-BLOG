const router = require('express').Router();
const { User } = require('../models/');

// SIGN UP. post to localhost:3001/user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        // save session, logged in
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;
            res.json('new user registered.')
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN. post to localhost:3001/user/login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({where: {username: req.body.username}});
        if (!user) {
            res.status(400).json({message: 'no user found'})
            return;
        }
        const validPw = user.checkPassword(req.body.password);
        if (!validPw) {
            res.status(400).json({message: 'incorrect password'})
            return;
        }
        req.session.save(() => {
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.loggedIn = true;
            res.json({user, message: 'logged in'});
        });
    } catch (err) {
        res.status(400).json({message: 'no user found'})
    }
});

// LOG OUT
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;