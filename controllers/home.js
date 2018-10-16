'use strict';

// import {login} from "./user"
exports.homePage = function(request, response) {

    var myValue =0 
    var localStorage = require('localStorage')
    // localStorage1.setItem('myKey', JSON.stringify(users));
    var myValue = localStorage.getItem('myKey');
    var jsonObject = JSON.parse(myValue);
     

    if(myValue != undefined) 
    console.log(jsonObject[0])

    console.log('home.js ')






//     var  localStorage;
//     var  LocalStorage
//   //   localStorage.setItem('user', userMap )
//   if (typeof localStorage === "undefined" || localStorage === null) {
//       var LocalStorage = require('node-localstorage').LocalStorage;
//        localStorage = new LocalStorage('../scratch');
//     }
//     // localStorage.setItem("userList", userMap);
//     // console.log(localStorage.getItem('userList'));
//     var value  =  localStorage.getItem('userList')
// console.log(value[0])


    //  var str1 = '['
    //  var str = ']'
    //  var a = str1.concat(value)
    //  var b = a.concat(str)
    //  console.log(value[2])
     
    


    response.render('home', {
        title: 'Home' , 
        // check : [{ __v: 0,
        //     password: '$2a$10$v0FIEkE7oNP1Gv9dH9P9vO.HUSDGqly4h95CrueC9TToH40Q2WRKq',
        //     email: 'waqaramjad345@gmail.com',
        //     _id: '5bb32cb58aeb239198a5e6da' },
        //   { __v: 0,
        //     password: '$2a$10$6to4/QmcpItF3YYAVJSeC.sS4D0q5FQqQ03TS4rYSbKQXn./jWjZK',
        //     email: 'waqaramjad34522@gmail.com',
        //     _id: '5bb356e38aeb239198a5e6db' }]
        check : jsonObject
       
          
    });
};
