let http = require("http");
let fs = require("fs");
let mime = require("mime");

http.createServer((request, response) => {
    if(request.method === "GET"){
        switch(request.url){
            case "/contacto":
                readFile("/contact.html", response);
                break;
            case "/":
                readFile("/index.html", response);
                break;
            case "/nosotros":
                readFile("/about.html", response);
                break;
            case "/proyectos":
                readFile("/projects.html", response);
                break;
            case "/favicon.ico":
                response.setHeader("Content-Type", "image/x-icon");
                readFile("/favicon.ico", response);
                break;
            default:
                readFile(request.url, response);
                break;
        }
    }else if(request.method === "POST"){
        switch(request.url){
            case "/usuarios":
                agregarUsuario(request);
                break;
            default:
                readFile(request.url, response);
                break;
        }

    }
}).listen(8080);


const readFile = (url, response) => {
    let urlF = __dirname + url;
    console.log(__dirname, url);
    fs.readFile(urlF, (error, content) => {
        if(!error){
            //mime.getType(urlF) -> nos regresaría el mime type dependiendo de la ruta
            //styles.css -> text/css
            //contact.html -> text/html
            response.setHeader("Content-Type", mime.getType(urlF));
            response.end(content);
        }else{
            response.writeHead(404);
            response.end("<h1>404</h1>")
        }
    })
}

const agregarUsuario = (request) => {
    let data = '';

    //Cuando se estén recibiendo datos
    request.on('data', chunk => {
        data += chunk;
    });
    
    //Cuando se terminen de procesar los datos
    request.on('end', () => {
        let datos = data.toString();
        console.log("Fin del stream");
        //fs.writeFile
        //1° argumento -> la ruta del archivo en el que queremos escribir 
        //Se creará el archivo si no existe en la ruta especificada 
        //2° argumento -> El contenido que queremos escribir
        //3° argumento -> función de callback que nos "notificará" en caso de que haya
        // un error al escribir en el archivo
        console.log(datos.split("&"));
        let user = {
            name: datos.split("&")[0].split("=")[1],
            lastname: datos.split("&")[1].split("=")[1],
            email: datos.split("&")[2].split("=")[1],
            password: datos.split("&")[3].split("=")[1]
        }
        fs.writeFile("usuarios2.txt", JSON.stringify(user), (error) => {
            if(error){
                console.log(error);
            }
        });
    });

    request.on('error', error => {
        console.log(error);
    })
}