const socket = io.connect();
socket.on('messages', data =>{
    console.log(data);
})
socket.on('messages', function (messages) {render("messages",data);})
socket.on('productos', function (productos) {render("productos",datos);})
function addMessage(e){
    const mensaje = {
        email: document.getElementById('email').value,
        text: document.getElementById('texto').value
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

