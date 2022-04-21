const {options} = require('./options/sqliteDB')
const knex = require('knex')(options);

const createTable = (async()=>{
    try {
        if(await knex.schema.hasTable('chat')){
            await knex.schema.dropTable('chat');
        }
        await knex.schema.createTable('chat', table =>{
            table.increments('id');
            table.string('nombre');
            table.string('mensaje');
            table.string('fecha');
        });
    console.log('tabla de mensajes creados')
    }catch(e){
        console.log(e)
    }finally{
        knex.destroy()
    }
});

module.exports = createTable;