const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const  commentRoute = require('./commentRoute');

router.use('/', homeRoutes);
router.use('/my-dash', dashRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoute);

module.exports = router;