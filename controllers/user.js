
'use strict';
var passport = require('passport');
var User = require('../models/User');

exports.loginPage = function (request, response) {
    console.log(request.user)
    if (request.user) {
        return response.redirect('/');
    }
    response.render('account/login', {
        title : 'Login' , 
        check : 'waqar amjad'
    });
};

exports.login = function (request, response, callback) {

    var userMap
    request.assert('email', 'Email is not valid').isEmail();
    request.assert('password', 'Password cannot be blank').notEmpty();
    User.find({}, function(err, users){
        // console.dir(users)
        var i =0 
        //  userMap = [];
        // users.forEach(function(user) {
        //     userMap[i] = user;
        //     i++
        //   });
        //   console.log(users[0].email)
        var localStorage1 = require('localStorage')
        localStorage1.setItem('myKey', JSON.stringify(users));
        // var myValue = localStorage1.getItem('myKey');
        // let jsonObject = JSON.parse(myValue);
        // console.log(jsonObject[0].password)

          var  localStorage;
          var  LocalStorage
        //   localStorage.setItem('user', userMap )
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require('node-localstorage').LocalStorage;
             localStorage = new LocalStorage('../scratch');
          }

          localStorage.setItem("userList", users);
         
        //   console.log(localStorage.getItem('userList'));
      
    })

    var errors = request.validationErrors();
  
    if (errors) {
        request.flash('errors', errors);
        return response.redirect('/login');
    }
    
    passport.authenticate('local', function (errors, user, validationMessages) {
        if (errors) {
            return callback(errors);
        }
        if (!user) {
            request.flash('errors', {
                msg : validationMessages.message
            });
            return response.redirect('/login');
        }
        request.logIn(user, function (err) {
            if (err) {
                return callback(err);
            }
        //    console.log(request.session.returnTo)
            response.redirect(request.session.returnTo || '/');
            // response.render( 'home', {check1  : userMap })
        });
    })(request, response, callback);
};

exports.logout = function (request, response) {
    request.logout();
    response.redirect('/');
};

exports.signupPage = function (request, response) {
    if (request.user) {
        return response.redirect('/');
    }
    response.render('account/signup', {
        title : 'Create Account'
    });
};

exports.signup = function (request, response, callback) {
    request.assert('email', 'Email is not valid').isEmail();
    request.assert('password', 'Password must be at least 8 characters long').len(8);
    request.assert('confirmPassword', 'Passwords do not match').equals(request.body.password);

    var errors = request.validationErrors();

    if (errors) {
        request.flash('errors', errors);
        return response.redirect('/signup');
    }

    User.findOne({
        email : request.body.email
    }, function (err, existingUser) {
        if (existingUser) {
            request.flash('errors', {
                msg : 'Account with that email address already exists.'
            });
            return response.redirect('/signup');
        }
        
        var user = new User({
            email : request.body.email,
            password : request.body.password
        });
        
        user.save(function (err) {
            if (err) {
                return callback(err);
            }
            request.logIn(user, function (err) {
                if (err) {
                    return callback(err);
                }
                response.redirect('/');
            });
        });
    });
};


exports.deleteAccount = function (request, response, callback) {

    console.log(request.user);
   var a = request.body.data
   User.remove({
        _id : request.user.id
    }, function (err) {
        if (err) {
            return callback(err);
        }
        request.logout();
        request.flash('info', {
            msg : 'Your account has been deleted.'
        });
        response.redirect('/');
    });
};

