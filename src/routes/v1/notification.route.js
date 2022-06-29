const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../../models/post.model.js');
const User = require('../../models/user.model.js');

router
    .route('/')
    .post((req, res) => {
        res.send('notification get route')
    })

module.exports = router;