const router = require('express').Router();

const homeRoute = require('./homeRoute');
const dashRoute = require('./dashRoute');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const  commentRoute = require('./commentRoute');

router.use('/', homeRoute);
router.use('/my-dash', dashRoute);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoute);

module.exports = router;