const User = require('../models/user')
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    })

};

exports.signin = (req, res) => {
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "Error: User with that email doesn't exist"
            });
        }
        // TODO: Create authenticate method
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Error: Email and Password do not match"
            });
        }

        // Generates a Signup token with User ID and Secret Key
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        // Persist the token as 't' in the cookie with the expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        // Return the response with user and token to frontend client
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, email, name, role}})
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({message: 'Signout Successful'});
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
        if (!user) {
            return res.status(403).json({
                error: "Access denied"
            });
        }
        next();
};

exports.isAdmin = (req, res, next) => {
    if (res.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource! Access denied."
        });
    }
    next();
};