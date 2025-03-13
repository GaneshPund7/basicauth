const express = require('express');
const router = express.Router();
const {getUser, addUser } = require('../Users/usercontroller');
const { getUserData, verifyloginDetails, forgetPassword} = require('../Users/login/controller');

router.get('/register', getUser );
router.post('/register', addUser );
router.get('/login', getUserData );
router.post('/login', verifyloginDetails );
router.post('/forgetPassword', forgetPassword);
module.exports = router;
