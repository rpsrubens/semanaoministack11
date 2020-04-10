const crypto = require ('crypto');// para criar criptografia ou gerar ID automático
const connection = require('../database/conection');//Importando conexão BD

module.exports = {

//Método para fazer select - CONSULTAS
    async index(request, response){
        const ongs = await connection('ongs').select('*');//Fazer select para pegar todos os registro
      
        return response.json(ongs);//retornar os registros 
    
    },

//Meto para realizar INSERT - CADASTRAR
    async create(request, response){

         /**
     * request - Guarda todos os dados que vem da nossa requisição 
     * 
     * response - Retorna uma resposta para o usuário*/
    
     const {name, email, whatsapp, city, uf} = request.body;//Criado 4 variáveis para que o usuário preencha só o necesário

     const id = crypto.randomBytes(4).toString('HEX');// Vai gerar 4 bits Hexadecimal para criar o ID da Ong
    //Fazendo insert no banco, passando tabela ongs e campos que vou fazer o insert
     await connection('ongs').insert({
         id,
         name,
         email,
         whatsapp,
         city,
         uf,
     })

    return response.json({id}); //Vamos retornar o ID da ONG para que o usuário possa fazer login     
    
    }


};