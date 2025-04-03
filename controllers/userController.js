const User = require("../models/user")
const getUsers = (async(req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const creatUser = (async(req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
module.exports = {
    getUsers,
    creatUser
}