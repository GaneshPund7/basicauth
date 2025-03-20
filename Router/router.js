const express = require('express');
const router = express.Router();
const {getUser, addUser } = require('../Users/usercontroller');
const { getUserData, verifyloginDetails, forgetPassword} = require('../Users/login/controller');
const { generateJWTToken, verifyToken } = require('../Users/jwtmiddleware');
const Users = require('../Users/userModal')
const bycrypt = require('bcryptjs');

router.get('/register', getUser );
router.post('/register', addUser );

router.get('/login', verifyToken, async(req, res)=>{
      let getUser = await Users.find();
        return res.status(200).json(getUser);
} );

// router.post('/logins', verifyloginDetails); 
router.post('/login', generateJWTToken, async (req, res)=>{
 let { email, password } = req.body;
    try {
        let verifyUser = await Users.findOne({ email });
        let myPassword = verifyUser.password;

        let hash_Passowrd = await bycrypt.compare(password, myPassword);
        if (!hash_Passowrd) {
            return res.status(500).send("Password is incorrect..!");
        } else if (verifyUser.email !== email) {
            return res.status(500).send("Email is incorrect..!");
        }
    
    } catch (error) {
        return res.status(404).send("Something went wrong");
    }
})

 

router.post('/forgetPassword', forgetPassword);
module.exports = router;
