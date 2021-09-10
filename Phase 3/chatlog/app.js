// We load the mongoose module.
let mongoose = require("mongoose");

// We load the express module.
let express = require("express");

// We create the reference of epxress module.
let app = express();

let url = "mongodb://localhost:27017/tcsmean";

// We load the http module and connect it to the express module with Server property.
let http = require("http").Server(app);

mongoose.pluralize(null);
mongoose.connect(url).then(res=>console.log("connected")).catch(err=>console.log(err));

let db = mongoose.connection;
db.once("open",()=> {
    let chatSchema = mongoose.Schema({
        name: String,
        message: String
    });
    let chatModel = mongoose.model("Chats", chatSchema);

// We load socket.io and connect the http module with IIFE features.
let io = require('socket.io')(http);

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"\\index.html");
})

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');
    
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

    socket.on("chat", (chat) => {
        chatModel.insertMany(chat, (error,result) => {
            if(!error) {
                console.log(result);
            } else {
                console.log(error);
            }
        });
        console.log(chat);
    })
 });

});

// We run the server with the http module and not the express module.
http.listen(9090,()=>console.log("Server running on port number 9090"));