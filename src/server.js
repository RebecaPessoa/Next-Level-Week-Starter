const express = require("express") //guarda as funcionalidades de "express" em express
const server = express() //chama a função criada, no objeto de servidor: server 

//pegar o banco de dados exportado no db.js
const db = require("./database/db.js")


//configurar pasta pública
server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

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

    //req.query: Query strings da url pelo get
    //console.log(req.query)


    return res.render("create-point.html")
})


//rota save-point
server.post("/savepoint", (req, res) => {

    //req.body: O corpo do formuláro pelo método post
    //console.log(req.body)

    //inserir dados no banco de dados (exerto de db.js)

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    //troca as interrogações por uma coleção (array)

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("create-point.html", { saved: false })
        }

        console.log("cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)
})



//rota search-results
server.get("/search", (req, res) => {

    const search = req.query.search
    if (search == "") {
        //pesquisa vazia
        //mostrar a página html com os dados do banco
        return res.render("search-results.html", { total })
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length //conta quantos elementos estão na tabela

        //mostrar a página html com os dados do banco
        //tudo qye for usado la fora deve ser enviado aqui como parâmetro (ex: places e total)
        //como o nome da constante é igual ao nome da chamada, total: total pode ser enviado com apenas total
        return res.render("search-results.html", { places: rows, total })

    })

})



//usa o objeto server para ligar o servidor
server.listen(3000)

