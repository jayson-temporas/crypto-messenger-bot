const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const request = require('request');

module.exports = {
    init: function(res){
   
        request.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,LTC,EOS,NEO,XMR,XLM,ADA,BCH&tsyms=USD', function(err, res, body) {

            if (!err && res.statusCode === 200) {

              let json = JSON.parse(body);

              if(json){
                  let summary="Today's Top Ten Cryptocurrency Price \n \n";

                  for(var i in json){
                    summary += i+ " " + json[i]['USD'] +"$ \n";
                  }

                  var message = 
                    {
                      "messages": [
                          {
                            "text": summary
                          }
                      ]
                    };

                    request({
                        url: 'https://graph.facebook.com/v2.11/me/message_creatives?access_token='+ PAGE_ACCESS_TOKEN,
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        form: message
                    }, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            // Print out the response body
                          try{
                              let b = JSON.parse(body);
                              if(b.message_creative_id){
                                  var message = 
                                          {

                                            "message_creative_id": b.message_creative_id,
                                              "custom_label_id": "1587730571313665"
                                          };

                                      // Start the request
                                      request({
                                          url: 'https://graph.facebook.com/v2.11/me/broadcast_messages?access_token='+ PAGE_ACCESS_TOKEN,
                                          method: 'POST',
                                          headers: {'Content-Type': 'application/json'}, 
                                          form: message
                                      },
                                      function (error, response, body) {
                                          if (!error && response.statusCode == 200) {
                                              // Print out the response body
                                              res.send(body);

                                          } else { 
                                              res.send(body);
                                          }
                                      });
                              }
                          } catch(e){
                            return false;
                          }
                        } else { 
                            // TODO: Handle errors
                            return false;
                        }
                    });


              } else {
                  // api error
              }
            } else { 
                // request error
            }
        });
    }
}