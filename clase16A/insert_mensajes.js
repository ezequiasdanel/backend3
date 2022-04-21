const {options} = require('./options/sqliteDB')
const knex = require('knex')(options);

async function addMensaje(message){
    try {
        const msj = {
            email: message.email,
            mensaje: message.mensaje,
            fecha: message.fecha,
        }
        const resp = await knex('chat').insert(msj);
        return resp;
    }catch(err){
        console.log(err);
    }
}
module.exports = addMensaje;     