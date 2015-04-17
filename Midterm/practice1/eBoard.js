var server = require('http').createServer(handler), 
        ip = "127.0.0.1", 
        port = 8080, 
        fs = require('fs'), 
        si = require('socket.io');

　

//透過網 
function handler(request, response) { 
        fs.readFile('./eBoard.html', function(err, data) { 
                if (err) 
                { 
                        response.writeHead(500, {'Content-Type':'text/plain'}); 
                        return response.end('Error loading msg.html'); 
                } 
                response.writeHead(200); 
                response.end(data); 
        }); 
}

　

server.listen(port, ip, function(){ 
        //node.js server 啟動並監聽時，所呈現的伺服器訊息 
        console.log("Server has started."); 
});

/* 
 * 用法： 
 * socket.on 接收另一端訊息 
 * socket.emit 將訊息送給到另一端 
 * socket.broadcast.emit 將訊息傳送給其他人（不含自己） 
 * io.socket.emit 將訊息傳送至包括自己在內的所有人 
 * */

var io = si.listen(server); 
io.sockets.on('connection', function(socket) {

        //登入初始化 
        socket.on('login', function(data) 
        { 
                //伺服端訊息 
                console.log("connected"); 
                
                //宣告物件，放置訊息 
                var obj = new Object; 
                obj.name = data.name; 
                obj.msg = data.name + ' 已上線'; 
                
                //將在前端輸入的名稱記錄下來 
                socket.name = data.name; 
                
                //將自己上線訊息傳給自己的網頁 
                socket.emit('msg', obj); 
                
                //告訴其他人你上線了 
                socket.broadcast.emit('msg', obj); 
        }); 
        
        //接受畫布作業訊息 
        socket.on('draw', function(data){ 
                //將畫布作業訊息傳給其他線上的人 
                socket.broadcast.emit('show', data); 
        });

        //離線 
        socket.on('disconnect', function() { 
                //宣告物件，放置訊息 
                var obj = new Object; 
                obj.msg = socket.name + ' 已離開'; 
                
                //通知所有人自己已經離開 
                io.sockets.emit('msg', obj); 
        }); 
        
});