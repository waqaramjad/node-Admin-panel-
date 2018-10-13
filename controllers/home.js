'use strict';

// import {login} from "./user"
exports.homePage = function(request, response) {
    response.render('home', {
        title: 'Home' , 
        check : [{ __v: 0,
            password: '$2a$10$v0FIEkE7oNP1Gv9dH9P9vO.HUSDGqly4h95CrueC9TToH40Q2WRKq',
            email: 'waqaramjad345@gmail.com',
            _id: '5bb32cb58aeb239198a5e6da' },
          { __v: 0,
            password: '$2a$10$6to4/QmcpItF3YYAVJSeC.sS4D0q5FQqQ03TS4rYSbKQXn./jWjZK',
            email: 'waqaramjad34522@gmail.com',
            _id: '5bb356e38aeb239198a5e6db' }]
       
          
    });
};