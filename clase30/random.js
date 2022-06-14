function randomNumbers(cant) {
    const numeros = []
    const min = 1;
    const max = 1000;
    for(let i = 0; i <  cant  ; i++) {
        const numbers = {numbers: Math.floor(Math.random() * (max - min) + min)}
        numeros.push(numbers)   
    } 
    return numeros
}

process.on('message', (passCant) => {
    if (passCant.length > 0 ) {
      process.send(randomNumbers(passCant));
    }
  });

// const cantidad = Number(process.argv[2])

// let arrNumeros = []
// const min = 1
// const max = 1000
// for (let i = 0; i < cantidad; i++){
//     arrNumeros.push(Math.floor((Math.random() * (max - min + 1)) + min))
// }

// arrNumeros = arrNumeros.sort()
// const salida = {}
// let cantidadRepetido = 1
// for (let i = 0; i < arrNumeros.length; i++){
//     if (arrNumeros[i+1] && arrNumeros[i] == arrNumeros[i+1]) {
//         cantidadRepetido++
//     }else{
//         salida[arrNumeros[i]] = `Se repitió ${cantidadRepetido} veces`
//         cantidadRepetido = 1
//     }
// }

// process.send(salida);


