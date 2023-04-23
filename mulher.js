const express = require ('express')
const router = express.Router()

const app = express()

const porta = 3333

function mostraMulher(request, response){
    response.json({
      nome: 'Simara Conceição',
      image: 'https://avatars.githubusercontent.com/u/50921892?v=4',
      minibio: 'Desenvolvedora e instrutora'
    })
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta,  mostraPorta)