const connection = require('../database/conection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;
//Contar todos os registros na tabela incidents
        const [count] = await connection('incidents').count();

        console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)//limitar 5 registros por página
        .offset((page - 1)* 5)//fazer esquema para validar 5 registro pro página
        .select([//Fazer select para pegar todos os registro na tabela incidents e os campos especificados abaixo da ONG
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);//Contagem dos itens - Retonar a informação no cabeçalho da página
      
        return response.json(incidents);//retornar os registros 
      
    },


    async create(request, response){
        const {title, description, value} = request.body;//Campos que temos na tabela de Incidentes
        request.headers;//Usado para acessar o Cabeçalho da requisição ex: dados do Usuário, localização, alterar o indioma automaticamente de onde o usuário esta acessando
        const ong_id = request.headers.authorization;//Pegar os dados da Ong logada

       const [id] =  await connection('incidents').insert({
            title, 
            description, 
            value, 
            ong_id,
        })
        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id ) {
                return response.status(401).json({error: 'Operation not permitted.'});
            }
            await connection('incidents').where('id', id).delete();

            return response.status(204).send();//Staus 204 - Resposta que deu sucesso mas não apresenta conteúdo
    }
};