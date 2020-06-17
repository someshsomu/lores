const moment = require('moment');
const { urlencoded } = require('body-parser');
messagedb = require("../models/message");
var username = String;

function formatMessage(user, text) {
    messagedb.findOne({ "room": user.room }, function(err, foundMsg) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundMsg)
            if (!foundMsg) {
                console.log(foundMsg)
                messagedb.create({
                    room: user.room,
                    message: [{
                        sender: {
                            id: user.username,
                            msg: text
                        }
                    }]
                }, function(err, createdmsg) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("created");
                    }
                })
            } else {
                var pushmsg = {
                    sender: {
                        id: user.username,
                        msg: text
                    }
                }
                console.log("from else" + typeof(foundMsg));
                console.log(foundMsg.message)
                console.log(foundMsg.room)
                console.log(foundMsg._id)
                foundMsg.message.push(pushmsg);
                foundMsg.save();
                console.log(foundMsg)
            }
        }
    })
    username = user.username;
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

module.exports = formatMessage;