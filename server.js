// JavaScript source code
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Allow the server to load your HTML/CSS/JS files
app.use(express.static(__dirname));


io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("send-message", (msg) => {
        io.emit("chat-message", msg);
    });

    socket.on("typing", (name) => {
        socket.broadcast.emit("typing", name);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

http.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
