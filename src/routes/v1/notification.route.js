const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
const router = express.Router();

router
    .route('/')
    .post((req, res) => {
        console.log(req.body)
        const obj = {
            message: "notification post route"
        }
        res.send(obj)
    })

module.exports = router;