const express = require('express');
const router = express.Router();
const purchaseRouter = require('./purchase');

router.use('/purchase', purchaseRouter);

module.exports = router;
