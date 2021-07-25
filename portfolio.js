var api = require("./api");

module.exports = {
    show: function(sender_psid, db){
        db.all("SELECT * FROM 'portfolios' where ssid = '"+sender_psid+"' ", function(err, rows) {
            let response = {};

            if (rows.length) {
                var txt = "Your portfolio: \n\n";

                for(var i in rows){
                    var cur_crypto = rows[i]['crypto'];
                    if(cur_crypto){
                        txt += cur_crypto.toUpperCase() + " " + rows[i]['crypto_value'] + "\n"
                    }  
                }

                txt+ "\n\n :) :) :)";

                response = {
                    "text": txt
                };

                api.send(sender_psid, response);
                api.defaultView(sender_psid)
            } else {
                response = { "text":"You don't have a portfolio yet." }

                api.send(sender_psid, response);
                api.defaultView(sender_psid)
            }
        });
    },
    run: function (msg,sender_psid,step,user_msg, db) {
        let response = {};
        let cur_msg = '';

        if(step == 0){
            step += 1;
            cur_msg = user_msg + msg + "-=-";
            db.run("update user_data set step="+step+", msg = '"+cur_msg+"' where ssid='"+sender_psid+"'");
            response = {
            "text": `Enter the amount you own.`
            }
            api.send(sender_psid, response);
        } else if(step == 1){
            step += 1;
            cur_msg = user_msg + msg + "-=-";
            db.run("update user_data set step="+step+", msg = '"+cur_msg+"' where ssid='"+sender_psid+"'");

            db.all("SELECT * FROM 'user_data' where ssid = '"+sender_psid+"' ", function(err, rows) {
                if (rows.length) {
                    var split = cur_msg.split('-=-');   
                    db.run("insert into portfolios(crypto,crypto_value,ssid)values('"+split[0]+"','"+split[1]+"','"+sender_psid+"')");
                    db.run("update user_data set step=0, msg = '', status='1' where ssid='"+sender_psid+"'");
                    response = { "text": "Your crypto portfolio is saved." }

                    api.send(sender_psid, response);
                    api.defaultView(sender_psid)
                }
            });

        } else {
            db.run("update user_data set step=0, msg = '', status='1' where ssid='"+sender_psid+"'");
            api.defaultView(sender_psid)
        }
    }
}