const express = require ('express') //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid');

const conectaBancoDeDados = require('./bancoDeDados')//aqui estou ligando ao arquivo banco de dados 
conectaBancoDeDados() //estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //aqui estou iniciando o app
app.use(express.json()) //aqui estou enviando os dados pela requisição no formato json
const porta = 3333 //aqui estou criando a porta

//aqui estou criando lista inicial de mulheres
const mulheres = [
      {
        id:'1',
        nome: 'Simara Conceição',
        imagem: 'https: //github.com/simaraconsceicao.png' ,
        minibio: 'Desenvolvedora e instrutora'
      },
      {
        id:'2',
        nome: 'Iana Chan',
        imagem: 'https: //bit.ly/3JCXBqP',
        minibio:  'Fundadora do Programaria'
      },
      {
        id:'3',
        nome: 'Nina da hora',
        imagem: 'https: //bit.ly/3FKpFaz',
        minibio: 'Hacker antiracista'
      }
  ]

//GET
async function mostraMulheres(request, response){
  try{
    const mulheresVindasDoBancoDeDados = await Mulher.find()
    response.json(mulheresVindasDoBancoDeDados)
  }catch(erro){
    console.log(erro)
  }
    
}

//POST
function criaMulher(request, response){

    const novaMulher = {
      id: uuidv4(),
      nome: request.body.nome,
      imagem: request.body.imagem,
      minibio: request.body.minibio
    }
    mulheres.push(novaMulher)
    response.json(mulheres)

}

//PATCH
function corrigeMulher(request, response){
    function encontraMulher(mulher){
      if(mulher.id === request.params.id){
        return mulher
      }
    }

    const mulherEncontrada = mulheres.find(encontraMulher)

    if(request.body.nome){
      mulherEncontrada.nome = request.body.nome
    }

    if(request.body.minibio){
      mulherEncontrada.minibio = request.body.minibio
    }

    if(request.body.imagem){
      mulherEncontrada.imagem = request.body.imagem
    }

    response.json(mulheres)
}

//DELETE
function deletaMulher(request, response){
    function todasMenosEla(mulher){
      if(mulher.id !== request.params.id){
          return mulher
      }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
}

app.use(router.get('/mulheres', mostraMulheres)) //configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configurei rota DELETE /mulheres/:id


//PORTA
function mostraPorta(){
  console.log("Servidor criado e rodando na porta ", porta)
}
app.listen(porta,  mostraPorta) //servidor ouvindo a porta
