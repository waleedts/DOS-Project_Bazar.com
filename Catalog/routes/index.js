const express = require('express');
const router = express.Router();
const updateRouter = require('./update');
const queryRouter = require('./query');

router.use('/update', updateRouter);
router.use('/query', queryRouter);


module.exports = router;
