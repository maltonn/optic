filename='slide.html'

const express=require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const crypto = require('crypto');

app.use(express.static('public'));

app.use(function(req, res, next) {//CORSの許可 ローカルファイルからでもアクセスできるようにする
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/html/admin.html');
});
app.get('/comments', function(req, res){
  res.sendFile(__dirname + '/html/archive.html');
});
app.get('/client', function(req, res){
  res.sendFile(__dirname + '/html/client.html');
});
app.get('/display',function(req,res){
  //res.sendFile(__dirname + '/html/display/'+filename);  //ロック解除
  res.redirect('/admin') //パスワードロックをかけたいとき
});

app.get('/', function(req, res){
  //res.sendFile(__dirname + '/html/confirm.html');//特定のホームページに誘導
  res.redirect('/client')
});

room_id_lst=[]
app.get('/get-room-id',dfs=function(req,res){
  params={}
  req.url.split('?')[1].split('&').forEach((e)=>{params[e.split('=')[0]]=e.split('=')[1]})
  charas= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','0','1','2','3','4','5','6','7','8','9'];
  id=""
  num=params['n']
  for(i=0;i<(num && 4<=num && num<=30?num:6);i++){
    id+=charas[Math.floor(Math.random()*charas.length)]
  }
  if(room_id_lst.includes(id)){
    return dfs(req,res)
  }else{
    room_id_lst.push(id)
    res.json({'id':id})
  }
})


app.post('/display',function(req,res){
  if (req.body.username!="moscwa"){
    res.redirect('/admin?wu');
    return;
  }
  let shasum = crypto.createHash('sha1'); 
  shasum.update(req.body.password+"saltvhiclk1ducdv8j2qmvzj3m4"); //一応saltを加える
  let hash = shasum.digest('hex');
  if (hash!="c85c9ef7b334a3a38eed9f7b8bbbd6967e236447"){
    res.redirect('/admin?wp');
    return;
  }
  res.sendFile(__dirname + '/html/display/'+filename);  
})

current_chc={}
io.of('/c').on('connection', function(socket){
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

io.of('/d').on('connection', function(socket){
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

io.of('/a').on('connection',function(socket){
  for(i=0;i<comments_list.length;i++){
    io.of('/a').emit('comment',comments_list[i])
  }
})





http.listen(port, function(){
  console.log('listening on *:' + port);
});

