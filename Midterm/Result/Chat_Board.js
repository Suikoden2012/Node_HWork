var server = require('http').createServer(handler),
//	ip 	   = "127.0.0.1",
	port   = '3000',
	fs 	   = require('fs')
	si     = require('socket.io');
	
	
	
//透過網路
function handler(request,response){
	fs.readFile('./Chat_Board.html',function(err,data){
		if(err)
		{
			
			response.writeHead(500,{'Content-Type':'text/plain'});
			return response.end('Error Loading msg.html');
		}
		response.writeHead(200);
		response.end(data);
	});
}

//啟動訊息
server.listen(port,function(){
	console.log("Server Start.");
});

var io = si.listen(server);
io.sockets.on('connection',function(socket){
	/*聊天訊息*/
	/*
	socket.on('addme',function(username) {		
	socket.username = username;
	socket.emit('chat', '系統: ',+ username+' 已經成功連線了。'); 
	socket.broadcast.emit('chat', '系統: ', username + ' 已經進來了。');
	});
	*/
	socket.on('sendchat', function(data) { 
		io.sockets.emit('chat',data);
	});
/*
	socket.on('disconnect', function() {
		io.sockets.emit('chat', '系統: ', socket.username + ' 已經離開了。');
	});*/
	
	
	/*畫布訊息*/
	socket.on('draw',function(data){
		//訊息傳給其他使用者
	socket.broadcast.emit('show',data);
	});
});