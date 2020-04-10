const express = require ('express');//Usando para fazer importação de dados, no caso express
const cors = require('cors');   //Declarando módulo cors, para questões de segurança
const routes = require('./routes');// Colocamos - ./ Para referenciar que é um arquivo e não um pacote - Importar as rotas que foram criadas no arquivo routes.js

const app = express();//Criando aplicação

app.use(cors());//Módulo de segurança para dizer quem poderá acessar nossa aplicação
app.use(express.json());//Informar que aplicação que estaremos usando método JSON para requisições
app.use(routes);//Importante as rotas serem abaixo do - app.use(express.json());


app.listen(3333);