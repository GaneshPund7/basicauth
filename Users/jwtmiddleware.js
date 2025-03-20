const Users = require('./userModal');
const jwt = require('jsonwebtoken');
const secretKey = "GaneshBhai";

const generateJWTToken = async (req, res, next) => {
    const { email } = req.body;
    const verifyUser = await Users.findOne({ email });
    try {
        jwt.sign({ verifyUser }, secretKey, { expiresIn: '100s' }, (error, token) => {
            res.json(token);
        })
    } catch (error) {
        return res.status(401).send("Token not genrated");
    }
    next();
}
const verifyToken = (req, res, next) => {

    const jwtToken = req.headers.authorization.split(' ')[1];
    jwt.verify(jwtToken, secretKey);
    next();
    
}

module.exports = { generateJWTToken, verifyToken }