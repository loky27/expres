let express = require("express");
let fs = require("fs");
const { request } = require("https");
let path = require("path");

let app = express();

//Middleware
app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.urlencoded({extended:false}))
//app.get -> get
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "index.html"));
});

app.get("/contacto", (request, response) => {
    response.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/nosotros", (request, response) => {
    response.sendFile(path.join(__dirname, "about.html"));
});

app.get("/proyectos", (request, response) => {
    response.sendFile(path.join(__dirname, "projects.html"));
});
app.post("/usuarios",(request,resposnse)=>{
    fs.writeFile("usuarios_db.tx",JSON.stringify(request.body),(error)=>{
        if(error){
            console.log(error)
        }
        else{
            resposnse.redirect("/")
        }
    })
})

//app.use -> get, post, delete, put
app.use((request, response) => {
    response.sendFile(path.join(__dirname, "404.html"));
});

app.listen(8080, () => {
    console.log("Servidor iniciado en el puerto 8080");
});