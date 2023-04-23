const express = require ('express')
const router = express.Router()

const app = express()

const porta = 3333

const mulheres = [
      {
        nome: 'Simara Conceição',
        imagem: 'https: //github.com/simaraconsceicao.png' ,
        minibio: 'Desenvolvedora e instrutora'
      },
      {
        nome: 'Iana Chan',
        imagem: 'https: //bit.ly/3JCXBqP',
        minibio:  'Fundadora do Programaria'
      },
      {
        nome: 'Nina da hora',
        imagem: 'https: //bit.ly/3FKpFaz',
        minibio: 'Hacker antiracista'
      }
  ]

function mostraMulheres(request, response){
    response.json(mulheres)
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta,  mostraPorta)