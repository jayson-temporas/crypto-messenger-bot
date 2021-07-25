'use strict';

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const request = require('request');
const api = require("./api");

module.exports = function(sender_psid){
    var message = { "user": sender_psid }
    
    request({
        url: 'https://graph.facebook.com/v2.11/1587730571313665/label?access_token='+ PAGE_ACCESS_TOKEN,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        form: message
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        response = { "text": "You are now subscribed. You will receive once a day the top ten cryptocurrency prices." }
        api.send(sender_psid, response);
        } else { 
            console.log("Failed in setting subscriber");
        }
    });
}