const router = require('express').Router();

const homeRoute = require('./homeRoute');
const dashRoute = require('./dashRoute');

router.use('/', homeRoute);
router.use('/my-dash', dashRoute);

module.exports = router;