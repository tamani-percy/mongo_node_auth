const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

//Register a new user
const register = async (req, res, next) => {
    const {username, email, password} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();
        res.json({message: `Registration of ${username} was successful`});
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const {username, password} = req.body

    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({message: `User ${username} not found`});
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({message: 'Incorrect password'});
        }

        const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {
            expiresIn: '1 hours'
        });
        res.json({token})
    } catch (e) {
        next(e);
    }
}

module.exports = {register, login}
