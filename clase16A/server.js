const path = require('path');
const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const router = require('router');
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const contenedorProductos = require('./contenedores')
const contenedorMensajes = require('./contenedores')
const createChat = require('./create_chat')
const createTableProduct = require('./create_productos')
const addChat = require('./insert_mensaje')
const addProd = require('./insert_producto')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

httpServer.listen(3000, ()=> console.log('server on'))

const messages = [];

const datos = [];

app.get('/', (req, res)=>{
    res.render('index', {datos, messages})
})

io.on('connection', function(socket) { 
    console.log('Un cliente se ha conectado');
    console.log(datos,messages)
     socket.on('new-dato', (data) => { 
         datos.push(data); 
         io.sockets.emit('productos',{datos}); 
    });

    socket.on('new-message', (data) => {
         messages.push(data);
         io.sockets.emit('messages', {messages}); });
});
router.get('/', async(req, res)=>{
    createTableProduct( );
    createChat();
    const data = await mensajes.contenedorMensajes();
    const prod = await productos.contenedorProductos();
    res.json('listarMensajes',{data})
    res.json('listarProductos',{prod})
})
router.post('/', async(req, res)=>{
    const data = req.body;
    const mensaje = await data.messages;
    const prod = await data.datos;
    const mensajeAgregado = await mensajes.addChat(mensaje);
    const productoAgregado = await productos.addProd(prod);
    res.render(mensajeAgregado, productoAgregado )
})
app.use(express.static(path.join(__dirname, 'public')))