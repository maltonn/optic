'use strict';

// [START appengine_websockets_app]
const app = require('express')();
//app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = require('http').Server(app);
const io = require("socket.io")(server, {//cors許可
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.get('/', (req, res) => {
  res.send('OPTIC Websocket server : see https://optic-malton.netlify.app/editor/')
})
/*
io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});
*/

let current_chc={}
io.of('c').on('connection', (socket)=>{ //client
  console.log('user connected')
  socket.on('room',function(room_id){
    socket.join(room_id)
    if (current_chc[room_id]){
      io.of('/c').to(room_id).emit('question',current_chc[room_id]);
    };
  socket.on('answer', function(ans){
    io.of('/d').to(room_id).emit('answer', ans);
  });
  socket.on('redo', function(ans){
    io.of('/d').to(room_id).emit('redo', ans);
  });
  socket.on('comment',function(com){
    io.of('/d').to(room_id).emit('comment',com['comment']);
    io.of('/a').to(room_id).emit('comment',com)
  });
});
});

io.of('/d').on('connection', function(socket){//display
  socket.on('room',function(room_id){
    socket.join(room_id)
    current_chc[room_id]=null
    socket.on('question', function(ch){
      current_chc[room_id]=ch
      io.of('/c').to(room_id).emit('question', ch);
    })
    socket.on('end_voting', function(){
      io.of('/c').to(room_id).emit('question',null);
      current_chc[room_id]=null
    })
  })
  
});

if (module === require.main) {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
}
// [END appengine_websockets_app]

module.exports = server;
