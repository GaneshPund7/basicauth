const Users = require('./userModal');
const bycrypt = require('bcryptjs');
async function getUser(req, res) {
    try {

        let getUser = await Users.find();
        return res.status(200).json(getUser);
    } catch (error) {
        return res.status(404).json(error.message);
    }
}


async function addUser(req, res) {

    let { name, email, password } = req.body
    try {
        let getUser = await Users.findOne({ email });
        if (!name || !email || !password) {
            return res.status(500).send("All fields are required...");
        }
        else if (getUser) {
            return res.status(400).send("Email alredy exist")
        }
        let demoSalt = 10;
        let hash_Password = await bycrypt.hash(password, demoSalt);

        let addUser = await Users.create({ name, email, password: hash_Password });
        return res.status(200).json(addUser);

    } catch (error) {
        return res.status(404).send(error.message);
    }
}
module.exports = { getUser, addUser };