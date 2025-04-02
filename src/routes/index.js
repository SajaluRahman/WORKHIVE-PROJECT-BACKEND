const express = require('express');
const {authRouter} = require('./authRoutes');
const router = express.Router();    

router.use('/user',authRouter);

module.exports = {apiRouter:router};