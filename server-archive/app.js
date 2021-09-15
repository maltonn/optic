const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {//cors許可
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  

current_chc={}
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

/*
io.of('/a').on('connection',function(socket){
  for(i=0;i<comments_list.length;i++){
    io.of('/a').emit('comment',comments_list[i])
  }
})
*/


server.listen(port, function(){
  console.log('listening on *:' + port);
});


