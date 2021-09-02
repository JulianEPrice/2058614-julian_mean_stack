// We load the express module.
let express = require("express");

// We create the reference of epxress module.
let app = express();

// We load the http module and connect it to the express module with Server property.
let http = require("http").Server(app);

// We create readline for server input.
let readline = require("readline");
let r1 = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

// We load socket.io and connect the http module with IIFE features.
let io = require('socket.io')(http);

app.get("/",(req,res)=> {
    res.sendFile(__dirname+"\\index.html");
})

io.on("connection",(socket)=> {
    r1.setPrompt(`Server: `);
    r1.prompt();
    console.log("Client connected");

    socket.on("hello_server",(msg)=> {
        console.log(msg);
        r1.prompt();
    })
    socket.on("name", (msg) => {
        console.log("Hello, " + msg);
    })

    socket.on("message", (msg) => {
        console.log("Client: " + msg);
        r1.prompt();
    })
    
    socket.emit("client_connected","Client connected to server...");
    r1.prompt();
    r1.on('line', (input) => {
        socket.emit("server_message", input);
        r1.prompt();
    });
})


// We run the server with the http module and not the express module.
http.listen(9090,()=>console.log("Server running on port number 9090"));