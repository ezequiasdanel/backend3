class Cart{
    constructor(){
        this.carrito = [];
        this.id = 0;
        this.productos = [];
    }

getProductsInCart(){
    try{
        return this.carrito
    }catch(e){
        throw new Error(`se produjo un error: ${e.message}`);
    }
}
DeleteCart(){
    try{
        return this.carrito = [];
    }catch(e){
        throw new Error(`se produjo un error: ${e.message}`);
    }
}
deleteProductInCart(id){
    try{
        const deleteProduct = this.productos.find((product) => product.id === id);
        console.log(deleteProduct)
        if(deleteProduct === -1){
            console.log("id no encontrado")
        }else{
            const deleteProduct = this.productos.splice(deleteProduct,1);
            console.log("id eliminado" + deleteProduct)
        }
    }catch(e){
        console.log("error: " + e.message)
    }
}
addProductToCart(id,body){
    try {

        const product = {
            id: id,
            timestamp: Date.now(),
            nombre: body.nombre,
            description: body.description,
            codigo: body.codigo,
            thumbnail: "",
            precio: body.precio,
            stock: body.stock,
        }
        this.productos.push((product) => product.id === id);
        return product;
    } catch (error) {
        throw new Error(`se produjo un error: ${error.message}`)
    }
        
}
addCart(){
    try {
        this.id ++
        const newCarrito = {
            id: this.id,
            timestamp: Date.now(),
            productos: this.productos
        }
    this.carrito.push(newCarrito)
    return newCarrito;
    } catch (error) {
        throw new Error(error.message)
    }
}
}


module.exports = Cart