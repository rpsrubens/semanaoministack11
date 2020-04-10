const knex = require('knex');//Importando knex
const configuration = require('../../knexfile');//Importando configurações do banco de dados

const connection = knex(configuration.development);//Criar a conexão do banco

module.exports = connection;//Exportar configurações da conexão com banco de dados