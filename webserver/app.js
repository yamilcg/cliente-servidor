const http= require('http');

const server = http.createServer((request, response)=>{
    console.log(request.url);
    response.writeHead(500);
    response.write ('HOLA MUNDO DESDE EL SERVIDOR WEB');
    response.end();

});

server.listen(8080);
