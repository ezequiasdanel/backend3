const {faker} = require('@faker-js/faker')
 
 
 function generateRandomProduct(cant) {
   const listProd = [];
    for (let index = 0; index < cant; index++) {
       
        const prod = {
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            imagen: faker.image.imageUrl()
        }
       
        listProd.push(prod)
        //console.log(listProd)
    }
    return listProd
}
 
 
module.exports = generateRandomProduct