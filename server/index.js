const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const cors = require("cors");
const { log } = require("console");


const app = express();

const port = 4500 || process.env.PORT;

const server = http.createServer(app);

const io=socketIO(server);

const users = [];



app.use(cors());

app.get("/",(req,res)=>{
    res.send("<h1>Hello it is working</h1>");
})

io.on("connection",(socket)=>{
    console.log("New connection");

    socket.on('joined',({user})=>{
        users[socket.id] = user;
        console.log(`${user} has joined`);
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`});
        socket.emit('welcome',{user:"Admin",message:`welcome to the chat,${users[socket.id]}`});
    })

    socket.on('disconnect',()=>{
        console.log(users[socket.id]);
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`});
        console.log('user left');
    });

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})

    })

  

});  

server.listen(port,()=>{
    console.log(`server is working on ${port}`);
})