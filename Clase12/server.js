const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// app.use(express.static('/public'))
// app.set('public','./public')
app.set('view engine', 'ejs')

const messages = [
    {email:'pepito@hotmail.com', text: 'Hola mundo!'}   
];

const datos = [];

app.get('/', (req, res)=>{
    res.render('public/index', {datos, messages})
})
app.post('/', (req, res)=>{
    datos.push(req.body)
    res.render('public/index',{datos, messages})
})

httpServer.listen(3000, ()=> console.log('server on'))

io.on('connection', function(socket){
    console.log('un cliente se ha conectado')
    socket.emit('messages',messages)
    socket.on('new-message', data =>{
        messages.push(data);
        io.sockets.emit('messages',messages)
    })
})