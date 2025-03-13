const Users = require('../userModal');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');
const secretKey = "GaneshBhai";

async function getUserData(req, res) {
    try {

        let getUser = await Users.find();
        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(404).json(error.message);
    }
}


async function verifyToken(req, res) {

}
async function verifyloginDetails(req, res) {
    let { email, password } = req.body;

    try {
        let verifyUser = await Users.findOne({ email });
        let myPassword = verifyUser.password;
        let verify_email = verifyUser.email;
        console.log(verify_email);

        let hash_Passowrd = await bycrypt.compare(password, myPassword);
        if (!hash_Passowrd) {
            return res.status(500).send("Password is incorrect..!");
        } else if (verifyUser.email !== email) {
            return res.status(500).send("Email is incorrect..!");
        }
        jwt.sign({ verifyUser }, secretKey, { expiresIn: '500s' }, (error, token) => {
            res.json(token);
        })

    } catch (error) {
        return res.status(404).send("Something went wrong");
    }
}

async function forgetPassword(req, res) {

    let { email } = req.body
    try {
        let getDetails = await Users.findOne({ email });
        let getEmail = getDetails.email;

        if(getEmail == email){
            console.log(getEmail);
            return res.status(200).json(getEmail);
            
        }
    } catch (error) {
        return res.status(404).json("Please enter valid email");

    }


}

module.exports = { getUserData, verifyloginDetails, forgetPassword};