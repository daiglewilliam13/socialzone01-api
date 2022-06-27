const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../models/post.model')
const User = require('../../models/user.model');

router
    .route('/')
    .get(async(req, res) => {
        let posts = await Post.find({}).then((data)=>{return data})
        let users = await User.find({}).then((data)=>{return data})
        res.send({posts, users})
    })

module.exports = router;