const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();
const mongoose = require('mongoose');


router
    .route('/')
    .get((req, res) => {
        res.send('search get route')
    })

module.exports = router;