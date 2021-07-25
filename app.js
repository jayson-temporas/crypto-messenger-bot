'use strict';

// Imports dependencies and set up http server
const 
    express = require('express'),
    body_parser = require('body-parser'),
    app = express().use(body_parser.json());

var sqlite3 = require('sqlite3').verbose();   
var getStarted = require("./getStartedButton");
var targetBroadcast = require("./targetBroadcast");
var broadcastTopTen = require("./broadcastTopTen");
var handlePostback = require("./handlePostback");
var handleMessage = require("./handleMessage");

// Open and/or setup a new sqlite3 database
var db = new sqlite3.Database('.data/cryptos.db');
db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, crypto TEXT, crypto_value TEXT, ssid TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS user_data (id INTEGER PRIMARY KEY AUTOINCREMENT, ssid TEXT, msg TEXT, status TEXT, step INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS portfolios (id INTEGER PRIMARY KEY AUTOINCREMENT, crypto TEXT, crypto_value TEXT, ssid TEXT)");
});


app.get('/test',function(req,res){
    db.all("SELECT * FROM 'portfolios'", function(err, rows) {
        if (rows.length == 0) {
            res.send("No Record");
        } else {
            res.send(JSON.stringify(rows));
        }
    });
});

app.get('/setup',function(req,res){
    getStarted.init(res);
});
app.get('/broadcast',function(req,res){
    targetBroadcast.init(res);
});

app.get('/send',function(req,res){
    broadcastTopTen.init(res);
});

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

app.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(function(entry) {
            let webhook_event = entry.messaging[0];
            let sender_psid = webhook_event.sender.id;

            db.all("SELECT * FROM 'user_data' where ssid = '"+sender_psid+"' ", function(err, rows) {
                let mode = 1;
                let step = 0;
                let user_msg = "";
                if (rows.length == 0) {
                    db.run("insert into user_data(ssid,msg,status,step)values('"+sender_psid+"','','1',0)");
                    mode = 1;
                    step = 0;
                    user_msg = "";
                } else {
                    mode = rows[0].status;
                    step = rows[0].step;
                    user_msg = rows[0].msg;;
                }
                if (webhook_event.message) {
                    handleMessage(sender_psid, webhook_event.message,mode,step,user_msg, db);        
                } else if (webhook_event.postback) {
                    handlePostback(sender_psid, webhook_event.postback);
                }
            });
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});