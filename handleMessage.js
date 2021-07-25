var api = require("./api");
var getCurrentCryptoValue = require("./getCurrentCryptoValue");
var setSubscriber = require("./setSubscriber");
var getTopTenCrypto = require("./getTopTenCrypto");
var portfolio = require("./portfolio")

const ACTIONS = {
    help: 'Help',
    donate: 'Donate',
    convert: 'Convert',
    topCrypto: 'Top Crypto',
    subscribe: 'Subscribe',
    myPortfolio: 'My portfolio',
    setPortfolio: 'Portfolio',
}

const MESSAGES_RESPONSE = {
    help: {
        "text": `To get the current crytocurrency value, you just need to type the crypto symbol of your desired coin. 
        \n\n Example 1: To get Bitcoin's value, just type 'btc'
        \n\n Example 2: To get Ethereum's value, just type 'eth'
        \n\n Example 3: To get Ripple's value, just type 'xrp'
        `
    },
    donate: {
        "text": `Like what I'am doing? Donations are welcome! \n \n USDT:\n 0xef4135c1db04bfd7756aeff72129cf6ea819df81 (ERC20) \n\n Thanks!`
    },
    convert: { 
        "text": `Cryto coin conversion will be available soon` 
    },
    setPortfolio: {
        "text": `Enter the symbol of cryptocurrency you want to add in your porfolio`
    }
}

module.exports = function (sender_psid, received_message,status,step,user_msg, db) {
    let response;

    if(status == 1){
        if (received_message.text == ACTIONS.help) {    
            response = MESSAGES_RESPONSE.help;
            api.send(sender_psid, response);
        } else if (received_message.text == ACTIONS.donate) {    
            response = MESSAGES_RESPONSE.donate
            api.send(sender_psid, response);

            setTimeout(function(){ 
                api.defaultView(sender_psid)
            }, 1500);
        } else if (received_message.text == ACTIONS.convert) {    
            response = MESSAGES_RESPONSE.convert;
            api.send(sender_psid, response);

            setTimeout(function(){
                api.defaultView(sender_psid)
            }, 1500);
        } else if (received_message.text == ACTIONS.topCrypto){
            getTopTenCrypto(sender_psid);
            setTimeout(function(){
                api.defaultView(sender_psid)
            }, 1500);
        } else if (received_message.text == ACTIONS.subscribe){
            setSubscriber(sender_psid);
        } else if (received_message.text == ACTIONS.myPortfolio){
            portfolio.show(sender_psid);
        } else if (received_message.text == ACTIONS.setPortfolio){
            db.run("update user_data set status = 2 , step=0, msg='' where ssid='"+sender_psid+"'");
            response = MESSAGES_RESPONSE.setPortfolio;
            api.send(sender_psid, response);
        } else {
            getCurrentCryptoValue((received_message.text).toUpperCase().trim() , sender_psid); 
        }
    } else if(status == 2){
        portfolio.run(received_message.text,sender_psid,step,user_msg, db);
    }
}