const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
const router = express.Router();
const Notification = require('../../models/notification.model')

router
    .route('/')
    .get(async (req, res) => {
        res.send('messages route')
    })

module.exports = router;