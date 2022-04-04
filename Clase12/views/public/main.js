const socket = io.connect();
socket.on('messages', data =>{
    console.log(data);
})

function render2 (datos){
    const data = datos.map((element) =>{
        return (`<tr>
        <td>${element.nombre}</td>
        <td>${element.precio}</td>
        <td><img src="${element.imagen}"</td>
        </tr>`)
    }).join(' ')
    document.getElementById('productos').innerHTML = data;
}



function render (data) {
    const html = data.map((elem) => {
        return (`<div>
        <p>${elem.email}</p>:
        <b>${elem.text}</b>
        </div>`)
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
}


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
}


socket.on('messages', function (data) {render(data);})
socket.on('productos', function (datos) {render(datos);})