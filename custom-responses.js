const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My first Page</title></head>');
  res.write('<body>');

  if (req.url === '/home') {
    res.write('<h1>Welcome home</h1>');
  } else if (req.url === '/about') {
    res.write('<h1>Welcome to About Us page</h1>');
  } else if (req.url === '/node') {
    res.write('<h1>Welcome to my Node.js project</h1>');
  } else {
    res.write('<h1>Page not found</h1>');
  }

  res.write('</body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
