const {options} = require('./options/mariaDB')
const knex = require('knex')(options);

const createTable = (async()=>{
    try {
        if(await knex.schema.hasTable('productos')){
            await knex.schema.dropTable('productos');
        }
        await knex.schema.createTable('productos', table =>{
            table.increments('id');
            table.string('nombre');
            table.string('precio');
            table.image('imagen');
        });
    console.log('tabla de productos creados')
    }catch(e){
        console.log(e)
    }finally{
        knex.destroy()
    }
});
module.exports = createTable;