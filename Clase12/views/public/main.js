const socket = io.connect();
socket.on('messages', data =>{
    console.log(data);
})


function render (data) {
    const html = data.map((elem) => {
        return (`<div>
        <strong>${elem.email}</strong>:
        <em>${elem.text}</em>
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


socket.on('messages', function (data) {render(data);})