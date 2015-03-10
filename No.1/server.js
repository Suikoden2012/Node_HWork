var server,
    ip   = "6.2.129.17",
    port = 5120,
    http = require('http'),
    fs = require("fs"),
    folderPath = ".",
    url = require('url'),
    path,
    filePath;

server = http.createServer(function (req, res) {
    path = url.parse(req.url);
    filePath = folderPath + path.pathname;
    console.log("filePath="+filePath);
    fs.readFile(filePath, function(err, file) {
      console.log("err="+err);
      if (err) {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end();
          return;
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(file);
      console.log(file);
      res.end();
    });
});

server.listen(port, ip);

console.log("Server running at http://" + ip + ":" + port);   