
'use strict';
var passport = require('passport');
var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');

exports.loginPage = function (request, response) {
    if (request.user) {
        return response.redirect('/');
    }
    response.render('account/login', {
        title : 'Login' , 
       
    });
};

exports.login = function (request, response, callback) {

    var userMap
    request.assert('email', 'Email is not valid').isEmail();
    request.assert('password', 'Password cannot be blank').notEmpty();
    User.find({}, function(err, users){
        var localStorage1 = require('localStorage')
        localStorage1.setItem('myKey', JSON.stringify(users));

      
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
            response.redirect(request.session.returnTo || '/');
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
    request.assert('confirmPassword', 'Passwords does not match').equals(request.body.password);

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

                User.find({}, function(err, users){
                    var localStorage1 = require('localStorage')
              localStorage1.setItem('myKey', JSON.stringify(users));   
                      })
                 

                response.redirect('/');
            });
        });
    });
};

exports.
accountManagementPage = function (request, response) {
    response.render('account/update', {
        title : 'Account Management', 
        id : request.body.id , 
        email : request.body.email

    });
};

exports.deleteAccount = function (request, response, callback) {

   User.remove({
        _id : request.body.id
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


exports.updateAccount = function (request, response, callback) {

    request.assert('email', 'Email is not valid').isEmail();
    request.assert('password', 'Password must be at least 8 characters long').len(8);
    request.assert('confirmPassword', 'Passwords does not match').equals(request.body.password);
    var errors = request.validationErrors();


    if (errors) {
        request.flash('errors', errors);
        return response.redirect('/');
    }

    var userId = request.body.id

    var conditions = {
        _id : userId 

       }
       var mypass =  request.body.password
       var hash = bcrypt.hashSync(mypass);
   
   

       var update = {
        email : request.body.email  , 
        password:  hash
       
       }

        User.findOneAndUpdate(conditions,update,function(error,result){
            if(error){
            }else{
              request.logout();
              request.flash('info', {
                  msg : ' account has been updated.'
              });
              response.redirect('/');
            }
          });
    
       

      

};

