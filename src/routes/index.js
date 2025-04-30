const express = require('express');
const { authRouter } = require('./authRoutes');
const router = express.Router();
const { AddPostRouter } = require('./postRoutes');
const {  clientProfileRouter } = require('./ClientProfileRoutes');


router.use("/clientprofile",clientProfileRouter );

router.use('/user', authRouter);
router.use('/post', AddPostRouter);

module.exports = { apiRouter: router };