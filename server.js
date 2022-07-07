
var express =require("express");
var app = express();

var http = require("http").createServer(app);

app.use(express.static('public'))

const io = require('socket.io')(http, {
    cors: {
       origin:"*"
    }
})

const users={};

http.listen(3000,function(){

    io.on('connection', socket =>{
        socket.on('new-user-joined', name=>{
    
            users[socket.id]=name;
            socket.broadcast.emit('user-joined',name);
        });
        socket.on('send', message =>{
              socket.broadcast.emit('receive',{message:message,name:users[socket.id]});
        });

        socket.on('disconnect', message =>{
            socket.broadcast.emit('Left',users[socket.id]);
            delete users[socket.id];
        })

    });
})

