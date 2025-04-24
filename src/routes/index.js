const express = require('express');
const { authRouter } = require('./authRoutes');
const router = express.Router();
const { AddPostRouter } = require('./postRoutes');

router.use('/user', authRouter);
router.use('/post', AddPostRouter);

module.exports = { apiRouter: router };