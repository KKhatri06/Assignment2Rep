// JavaScript source code
const socket = io();

let username = prompt("Enter your name:");

// Send a message
document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const input = document.getElementById("message-input");
    const message = username + ": " + input.value;

    socket.emit("send-message", message);
    input.value = "";
});

// Receive a message
socket.on("chat-message", (msg) => {
    const messages = document.getElementById("messages");
    const p = document.createElement("p");
    p.textContent = msg;
    messages.appendChild(p);
});

// Typing indicator
document.getElementById("message-input").addEventListener("input", () => {
    socket.emit("typing", username);
});

socket.on("typing", (name) => {
    const indicator = document.getElementById("typing-indicator");
    indicator.textContent = name + " is typing...";

    setTimeout(() => {
        indicator.textContent = "";
    }, 1000);
});
