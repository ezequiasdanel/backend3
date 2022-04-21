const {mariaDB} = require('./options/mariaDB')
const {sqLite} = require('./options/sqliteDB')
const knex = require('knex')
const {addMessage} = require('./insert_mensajes')
const {addProduct} = require('./insert_productos')

contenedorMensaje = new ContenedorMensajes(sqLite)
contenedorProductos = new ContenedorProductos(mariaDB)

class Contenedor {
    constructor(config) {
        this.config = config
        this.knex = knex(config)
    }
}
class ContenedorMensajes extends Contenedor {
    constructor(config) {
        this.super(config);
    }
    guardarMensajes(mensajes) {
        addMessage(mensajes)
    }
}
class ContenedorProductos extends Contenedor {
    constructor(config) {
        this.super(config);
    }
    guardarProductos(productos) {
        addProduct(productos)
    }
}


module.exports = ContenedorMensajes,
                 ContenedorProductos;