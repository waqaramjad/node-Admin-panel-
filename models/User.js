'use strict';
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

userSchema.pre('save', function(callback) {
  var user = this;
  if (!user.isModified('password')) {
    return callback();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {  
        return callback(err);
      }
      user.password = hash;
      callback();
    });
  });
});


userSchema.methods.verifyPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
