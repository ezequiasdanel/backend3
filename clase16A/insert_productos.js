const {options} = require('./options/mariaDB')
const knex = require('knex')(options);

async function addProducto(producto){
    try {
        const prod = {
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: product.imagen,
        }
        
        const resp = await knex('productos').insert(prod);
        return resp;
    }catch(err){
        console.log(err);
    }
}

module.exports = addProducto;