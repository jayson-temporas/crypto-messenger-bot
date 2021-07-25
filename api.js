const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const request = require('request');

module.exports = {
    send: function(sender_psid, response) {
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": response
        }

        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, (err, res, body) => {

        }); 
    },
    defaultView: function(sender_psid){
        let response;
        response = {
                "attachment": {
                "type": "template",
                    "payload": {
                    "template_type": "generic",
                    "elements": [
                        {
                            "title": "Check Cryptocurrency Exchange Value",
                            "subtitle":"Choose from the list or type Crypto Code",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "Bitcoin",
                                    "payload": "1",
                                },
                                {
                                    "type": "postback",
                                    "title": "Ether",
                                    "payload": "3",
                                },
                                {
                                    "type": "postback",
                                    "title": "Ripple",
                                    "payload": "2",
                                }
                            ],
                        },
                        {
                        "title": "Swipe left/right for more options.",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "IOTA",
                                "payload": "4",
                            },
                            {
                                "type": "postback",
                                "title": "LTC",
                                "payload": "5",
                            },
                            {
                                "type": "postback",
                                "title": "QTUM",
                                "payload": "6",
                            }
                        ]
                        },
                        {
                            "title": "Swipe left/right for more options.",
                            "buttons": [
                                {
                                    "type": "postback",
                                    "title": "BCH",
                                    "payload": "7",
                                },
                                {
                                    "type": "postback",
                                    "title": "ADA",
                                    "payload": "8",
                                },
                                {
                                    "type": "postback",
                                    "title": "NEO",
                                    "payload": "9",
                                }
                            ]
                        }
                    ]
                }
            }, "quick_replies":[
                {
                    "content_type":"text",
                    "title":"Help",
                    "payload": "help"
                },
                {
                    "content_type":"text",
                    "title":"Top Crypto",
                    "payload": "topcrypto"
                },
                {
                    "content_type":"text",
                    "title":"Donate",
                    "payload": "donate"
                },
                {
                    "content_type":"text",
                    "title":"Subscribe",
                    "payload": "subscribe"
                }
            ]
        };
        this.send(sender_psid, response);  
    }
};

