//importar modulos
const express = require("express");
const path = require("path");
const pages = require("./pages.js");

//iniciando o express
const server = express();

//porta
const port = process.env.port || 5500;

server

  //utilizar body do req
  .use(express.urlencoded({ extended: true }))
  //utilizando arquivos estáticos
  .use(express.static("public"))

  //configurar template engines
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "hbs")

  //rotas
  .get("/", pages.index)
  .get("/create-orphanage", pages.createOrphanage)
  .get("/orphanages", pages.orphanages)
  .get("/orphanage", pages.orphanage)
  .post("/save-orphanage", pages.saveOrphanage);

//ligar o servidor
server.listen(port);
