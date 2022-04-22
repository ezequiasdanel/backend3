const path = require('path');
const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)
const {contenedorProducto, contenedorMensaje} = require('./contenedores')


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
    
    socket.on('new-dato', (data) => { 
         datos.push(data);
         contenedorProducto.guardarProductos(data)
         io.sockets.emit('productos',{datos}); 
    });

    socket.on('new-message', (data) => {
         messages.push(data);
         contenedorMensaje.guardarMensajes(data)
         io.sockets.emit('messages', {messages});
    });
});


app.use(express.static(path.join(__dirname, 'public')))