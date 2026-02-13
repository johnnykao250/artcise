// Minimal test: if you can open http://127.0.0.1:8765 in browser, Node and localhost work.
const http = require('http');
const port = 8765;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>It works!</h1><p>Node and localhost are OK. Try Artcise on port 3001 again.</p>');
});
server.listen(port, '0.0.0.0', () => {
  console.log('Test server running. Open in browser: http://127.0.0.1:' + port);
});
