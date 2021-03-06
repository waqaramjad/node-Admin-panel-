'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/User');

exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

var localStrategy = new LocalStrategy(
    {usernameField : 'email'},
    function (email, password, callback) {
        email = email.toLowerCase();
        User.findOne({email : email}, 
        function (err, user) {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false, {
                    message : 'Email ' + email + ' not found'
                });
            }
            
            user.verifyPassword(password, function(err, callbackResult) {
                if (callbackResult) {
                    return callback(null, user);
                } else {
                    return callback(null, false, { message: 'Invalid email or password.' });
                }
            });
        });
    });
passport.use('local', localStrategy);

passport.serializeUser(function (user, callback) {
    callback(null, user.id);
});

passport.deserializeUser(function (id, callback) {
    User.findById(id, function (err, user) {
        callback(err, user);
    });
});