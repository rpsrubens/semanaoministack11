const express = require ('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SesssionController = require('./controllers/SesssionController');


/** 
 * Rota e recursos que estamos querendo acessar
 * ex: /users - tudo que tiver depois da barra é o que estamos querendo acessar
 */
//colocar a rota do que vai ser acessado, no exeplo abaixo colocarmos '\', pq não temos nenhuma caminho a ser acessado
/**
 * Métodos HTTP:
 * 
 * GET: Buscar/ Listar uma informação do back-end - qualquer tipo de retorno - ex: buscar um usuário, listagem.
 * POST: Criar uma informação no back-end - ex: uma rota que vai criar um novo usuário
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 /**
  * Tipos de Parâmestros:
  * 
  * Query Parâmetros: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação)
  * ex: const params = request.query;
  * 
  * Route Params: Parâmetros utilizados para identificar recursos
  * ex: const params = request.params;
  * 
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  * ex: const body = request.body;
  */

  /**
   * SQL: MYSQL, SQLite, PostgredSQL, Oracle, Microsoft SQL Server
   * NoSQL: MongoDB, CouchDB, etc
   * 
   */
  
  const routes = express.Router();

  routes.post('/sessions', SesssionController.create);   
   
  //Método para fazer select - CONSULTAS
 routes.get('/ongs',  OngController.index);
   //Meto para realizar INSERT - CADASTRAR
  routes.post('/ongs', OngController.create);

  routes.get('/profile', ProfileController.index);

  routes.get('/incidents', IncidentController.index);
  routes.post('/incidents', IncidentController.create);
  routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;//Exportar rota para que possa estar visível e é dessa forma que expostarmos uma variável