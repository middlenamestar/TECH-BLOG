const router = require('express').Router();

const homeRoute = require('./homeRoute');
const dashRoute = require('./dashRoute');
const userRoutes = require('./userRoutes');

router.use('/', homeRoute);
router.use('/my-dash', dashRoute);
router.use('/user', userRoutes);

module.exports = router;