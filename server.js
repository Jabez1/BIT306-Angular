const http = require('http');
const app = require('./back-end/app');

const port = 3000;

app.set('port', port)

const server=  http.createServer(app);
/*
const server = http.createServer((req, res) => {
  res.end('This is my first response')
});*/

server.on('request', (request, response) => {
  console.log("request " + request.url + " " + "method: " + request.methodx);
  response.statusCode = 200;

  request.on('data', (chunk) => {
    console.log("Receiving data" + chunk);
  });
  request.on('end', ()=>{
    console.log("Receiving data - end" + request.url);
  });
});

server.listen(port, ()=> {
  console.log(`Server running at port: ${port}`);
});
