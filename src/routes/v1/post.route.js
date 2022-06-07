const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();


router
    .route('/')
    .get((req, res)=>{
        res.send('posts get route')
    })
    .post((req, res)=>{
        console.log(req.body);
        res.send('posts POST route')
    });

module.exports = router;