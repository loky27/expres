let http = require("http");
let morgan = require("morgan");

let logger = morgan('dev');

http.createServer((request, response) => {
    logger(request, response, (err) => {
        if (err) return done(err)

        if(request.url === "/contacto"){
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.write("<h1>Página de contacto</h1>");
            response.end();
        }else if(request.url === "/"){
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.write("<h1>Página de inicio</h1>");
            response.end();
        }else{
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.write("<h1>404</h1>");
            response.end();
        }
        
    });
}).listen(8080);