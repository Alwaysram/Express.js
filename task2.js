const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    const filePath = path.join(__dirname, "message.txt");
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }

      console.log('Data from file:', data);

      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>Enter Message</title></head>');
      res.write('<body>');
      res.write(`<p>${data}</p>`);
      res.write('<form action="/message" method="POST">');
      res.write('<input type="text" name="message">');
      res.write('<button type="submit">Send</button>');
      res.write('</form>');
      res.write('</body>');
      res.write('</html>');
      res.end();
    });
  } else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fs.writeFile('message.txt', message, (err) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end("Internal Server Error");
        }

        console.log('Inside fs.writeFile');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      });
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body><h1>Hello to my Node.js server</h1></body>');
    res.write('</html>');
    res.end();
  }
});

server.listen(3000)

