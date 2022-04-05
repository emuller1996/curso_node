const https = require('https');
const fs = require('fs');

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8001);