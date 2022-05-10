const mariaDB = require('./options/mariaDB')
const sqLite = require('./options/sqliteDB')
const knex = require('knex')
const addMessage = require('./insert_mensajes')
const addProduct = require('./insert_productos')

class Contenedor {
    constructor(config) {
        this.knex = knex(config.options)
    }
}
class ContenedorMensajes extends Contenedor {
    constructor(config) {
        super(config);
    }
    guardarMensajes(mensajes) {
        addMessage(mensajes)
    }
}
class ContenedorProductos extends Contenedor {
    constructor(config) {
        super(config);
    }
    guardarProductos(productos) {
        addProduct(productos)
    }
}


const contenedorMensaje = new ContenedorMensajes(sqLite)
const contenedorProducto = new ContenedorProductos(mariaDB)


module.exports = {contenedorMensaje, contenedorProducto}