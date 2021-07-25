'use strict';

const request = require('request');
const api = require("./api");
const WARNING_MESSAGE = 'Error communicating to server. Try again.';

module.exports = function (sender_psid) {
    let response;
  
    request.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,LTC,EOS,NEO,XMR,XLM,ADA,BCH&tsyms=USD', function(err, res, body) {
  
        if (!err && res.statusCode === 200) {
            let json = JSON.parse(body);
            
            if(json){
                let summary="Top Ten Cryptocurrency \n \n";

                for(var i in json){
                    summary += i+ " " + json[i]['USD'] +"$ \n";
                }

                response = { "text": summary }
                api.send(sender_psid, response);
            } else {
                response = { "text": WARNING_MESSAG };

                api.send(sender_psid, response);
                api.defaultView(sender_psid);
            }
        } else { 
            response = { "text": WARNING_MESSAGE };
            api.send(sender_psid, response);
            api.defaultView(sender_psid);
        }
    });
}