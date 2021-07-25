'use strict';

const request = require('request');
const api = require("./api");
const WARNING_MESSAGE = "Invalid Crypto Coin Symbol! :/ \n \n Choose from the list or type the crypto symbol \n \n Example: BTC";

module.exports = function(crypto, sender_psid){
    let response;
    
    if(crypto){
        request.get('https://min-api.cryptocompare.com/data/price?fsym='+crypto+'&tsyms=USD', function(err, res, body) {
            if (!err && res.statusCode === 200) {
                let json = JSON.parse(body);

                if(json.USD){
                    
                    let total =  json.USD;
                    if(total < 1){
                    total = total.toFixed(4);
                    } else {
                    total = total.toFixed(2);
                    }
                    response = {
                        "attachment": {
                            "type": "template",
                            "payload": {
                            "template_type": "generic",
                            "elements": [{
                                    "title": crypto + " value is: " + total + "$",
                                    "subtitle": "",
                                    "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "Back",
                                        "payload": "0",
                                    }
                                    ], 
                                }
                            ]}
                        }
                    }
                    api.send(sender_psid, response);
                } else {
                    response = {
                        "text": WARNING_MESSAGE,
                    }
                    api.send(sender_psid, response);
                    api.defaultView(sender_psid);
                }
                
            } else { 
                response = {
                "text": WARNING_MESSAGE
                }
                
                api.send(sender_psid, response);
                api.defaultView(sender_psid);
            } 
        });

    } else {
        response = {
            "text": WARNING_MESSAGE
        }
        api.send(sender_psid, response);
        api.defaultView(sender_psid);  
    }      
}