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
    .post(async (req, res) => {
        console.log(req.body)
        const obj = req.body;
        const newNotification = new Notification(obj)
        const result = await newNotification.save();
        res.send(result)
    })

module.exports = router;