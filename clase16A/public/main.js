const socket = io.connect();
socket.on('messages', data =>{
    console.log(data);
})
socket.on('messages', function (messages) {render('messages',messages);})
socket.on('productos', function (productos) {render('productos',productos);})
const moment = require('moment');
const momentNow = moment().format('MMMM Do YYYY, h:mm:ss a')
function addMessage(e){
    const mensaje = {
        email: document.getElementById('email').value,
        text: document.getElementById('texto').value,
        fecha: momentNow
        
    }
    socket.emit('new-message', mensaje)
    return false
}
function addProduct(e){
    const product = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        imagen: document.getElementById('imagen').value
    }
    socket.emit('new-dato', product)
    return false
}


