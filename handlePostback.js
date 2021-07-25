'use strict';

const api = require("./api");
var getCurrentCryptoValue = require("./getCurrentCryptoValue");

module.exports = function (sender_psid, received_postback) {
    let response;

    let payload = received_postback.payload;

    if (payload === '1') {
        getCurrentCryptoValue('BTC',sender_psid);
    } else if (payload === '2') {
        getCurrentCryptoValue('XRP',sender_psid);
    } else if (payload === '3') {
        getCurrentCryptoValue('ETH',sender_psid);
    } else if (payload === '4') {
        getCurrentCryptoValue('IOTA',sender_psid);
    } else if (payload === '5') {
        getCurrentCryptoValue('LTC',sender_psid);
    } else if (payload === '6') {
        getCurrentCryptoValue('QTUM',sender_psid);
    } else if (payload === '7') {
        getCurrentCryptoValue('BCH',sender_psid);
    } else if (payload === '8') {
        getCurrentCryptoValue('ADA',sender_psid);
    } else if (payload === '9') {
        getCurrentCryptoValue('NEO',sender_psid);
    } else {
        api.defaultView(sender_psid);
    }

    api.send(sender_psid, response);
}
