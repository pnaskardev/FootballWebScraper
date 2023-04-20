// IMPORTS FROM PACKAGES
const bcryptJs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// IMPORTS FROM FILES
const validator=require('../utils/validator');
const User = require('../models/user');

// INIT
dotenv.config();

// CONTROLLERS
exports.tokenIsValid = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);
        const verified = jwt.verify(token, process.env.PASS_KEY);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        res.json(true);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Invalid token" });
    }
}

// SIGN UP
exports.postSignupUser = async (req, res, next) => {
    try {
        const { name,email, password } = await req.body;
        console.log(`${name} ${phone} ${email} ${password}`);
        if (!validator.ValidateEmail(email)) 
        {
            return res.status(400).json
            ({
                message: "Please provide a valid email address"
            });
        }
        const existingUser = await User.findOne({ email }) || await User.findOne({ phone });
        if (existingUser) 
        {
            return res.status(400).json
            ({
                msg: "User with same email/phone already exists"
            });
        }

        // return that data to the user 
        const hashedPassword = await bcryptJs.hash(password, 8);
        let user = new User
        ({
            name,
            password: hashedPassword,
            email,
            selectedLeagues: []
        })
        user = await user.save();
        // res.status(200).json(user);
        const token = jwt.sign({ id: user._id }, process.env.PASS_KEY);
        res.status(200).json({ token, ...user._doc });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create user" });
    }

}

// SIGN-IN
exports.postSignInUser = async (req, res, next) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ msg: "User with this name does not exist" });
        }
        const isMatch = await bcryptJs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.PASS_KEY);
        res.json({ token, ...user._doc });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};
