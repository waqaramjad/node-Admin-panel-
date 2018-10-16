'use strict';

exports.homePage = function(request, response) {

   
    var localStorage = require('localStorage')
    var myValue = localStorage.getItem('myKey');
    var jsonObject = JSON.parse(myValue);
     


    response.render('home', {
        title: 'Home' , 
        check : jsonObject
    });
};
