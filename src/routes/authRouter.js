const express = require('express');
const authRouter = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../../config');
mongoose.Promise = global.Promise;
const User = require('../models/user');

authRouter.route('/register')

    .post(function (req, res) {
        if (!req.body.login || !req.body.password) {
            res.json({success: false, message: 'Please enter an login and password to register.'});
        } else {
            const newUser = new User({
                login: req.body.login,
                password: req.body.password
            });

            newUser.save(function (err) {
                if (err) {
                    if (err.code === 11000) {
                        return res.json({success: false, message: 'Registration failed. User exist.'});
                    } else res.send(err);
                }
                res.json({success: true, message: 'User created successfully'});
            })
        }
    });

authRouter.route('/login')

    .post(function (req, res) {
        User.findOne({login: req.body.login}, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.send({success: false, message: 'Authentication failed. User not found.'});
            } else {
                //check password
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // create token
                        const payload = {
                            id: user._id,
                            login: user.login
                        };
                        const token = jwt.sign(payload, config.secret, {
                            expiresIn: 86400
                        });
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.send({success: false, message: 'Authentication failed. Password did not match.'});
                    }
                });
            }
        });
    });

module.exports = authRouter;
