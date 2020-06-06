const express = require("express") //guarda as funcionalidades de "express" em express
const server = express() //chama a função criada, no objeto de servidor: server 


//configurar pasta pública
server.use(express.static("public"))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



//configurar rotas da aplicação
//rota página inicial
server.get("/", (req, res) => {
    return res.render("index.html") //o __dirname retorna o caminho do arquivo atual
})

//rota create-point
server.get("/create-point", (req, res) => {
    return res.render("create-point.html") //o __dirname retorna o caminho do arquivo atual
})

//rota search-results
server.get("/search", (req, res) => {
    return res.render("search-results.html") //o __dirname retorna o caminho do arquivo atual
})



//usa o objeto server para ligar o servidor
server.listen(3000)

