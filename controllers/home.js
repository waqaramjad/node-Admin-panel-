'use strict';

exports.homePage = function(request, response) {

    var myValue =0 
    var localStorage = require('localStorage')
    var myValue = localStorage.getItem('myKey');
    var jsonObject = JSON.parse(myValue);
     

    if(myValue != undefined) 
    console.log(jsonObject[0])

    response.render('home', {
        title: 'Home' , 
        check : jsonObject
    });
};
