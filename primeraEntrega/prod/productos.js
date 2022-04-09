class Products{
    constructor(){
        this.products = [];
        this.id = 0;
        this.admin = false;
    }

    getproductsAll(){
    try {   
        return this.products
        
    } catch (error) {
        throw new Error(`se produjo un error: ${error.message}`);
        
    }
}
    saveProduct(product){
        if(this.admin === true){
        try {
            this.id++;
            const newProduct ={
                id: this.id,
                timestamp:Date.now(),
                nombre: product.nombre,
                description: product.description,
                codigo: product.codigo,
                thumbnail:'',
                precio: product.precio,
                stock: product.stock
            }
        this.products.push(newProduct);
        return newProduct;
        }catch (error) {
            throw new Error(`se produjo un error al guardar el nuevo producto: ${error.message}`);
        }
    }else{
        console.log('Disponible para administradores')

    }
    }

    getProductById(idProduct){
        try {

            return this.products.find(product => product.id == idProduct)
        }catch (error) {
            throw new Error(`se produjo un error al buscar`)
        }
    }

    updateProductById(idProduct, body){
        if(this.admin === true){
        const product = {
            id: idProduct,
            timestamp: body.timestamp,
            nombre: body.nombre,
            description: body.description,
            codigo: body.codigo,
            thumbnail: " ",
            precio: body.precio,
            stock: body.stock,
        }
        const updateIndex = this.products.findIndex((product)=>product.id === idProduct)
        this.products[updateIndex] = product
        return product;
    }else{
        console.log('Disponible para administradores') }
    }

    deleteProductById(idProduct){
        if(this.admin === true){
        try {
            const deleteIndex = this.products.findIndex((product) => product.id === idProduct)
            console.log(deleteIndex)
            if (deleteIndex === -1) {
                console.log("id no encontrado")
                
            } else {
                const deleteProduct = this.products.splice(deleteIndex,1)
                console.log("id eliminado\n")
                console.log(deleteProduct)
            }

        } catch (error) {
            console.log("error" + error.message)
            
        }}else{
            console.log('Disponible para administradores')
        }

    }
}

module.exports = Products