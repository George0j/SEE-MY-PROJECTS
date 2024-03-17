const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const fs=require('fs')
const app = express();

app.get('/', function(req, res){
    fs.readFile('index.html',(err,data) => {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        res.end();
    });
 });
const server = http.createServer(app);

const io = socketIO(server, {
  cors: { origin: "*" },
});
function randomnumber(){
  return Math.floor(Math.random() * 10);
}
function randomnumber(data){
  var r='';
  data=data.split(',');
  var d=parseInt(data[1])-parseInt(data[0]);
  for(var i=0;i<1;i++){
    r=(parseInt(data[0])+Math.floor(Math.random()*d)).toString();
  }
  return r;
}
io.on("connection", (socket) => {
  socket.emit('online','1');
  socket.on('generate',(data) => {
    var r=randomnumber(data);
    console.log('Genarating a random number .......>'+r);
    socket.emit('generate',r);
  });
  socket.on('disconnect',() => {
            console.log('user disconnected!');
        });
    });
const port = 3000 ;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});