const express = require ('express')
const { Router } = express
const PORT = process.env.PORT
const app = express()
const router = Router()
const Products = require("./prod/productos")
const Cart = require('./cart/cart')

app.use(express.static('public'));
app.use(express.urlencoded({extended : true}))
app.use('/api/products', router)
app.use('/api/cart', router)

const storeProductos = new Products()
const storeCart = new Cart()
router
//.GET Para traer todos los productos.
    .get('/', (req,res) =>{
        try {
            res.status(200).json(storeProductos.productsAll)
        } catch (error) {
            res.status(500).json(error.message)
        }
    })
//.get para traer un producto por su id.
    .get('/:idProduct', (req,res) =>{
        try {
            const product = storeProductos.getProductById(req.params.idProduct)
            if (product) {
                return res.status(200).json(product)
            } 
            return res.status(404).json({error:'producto no encontrado'})
        } catch (error) {
            res.status(500).json(error.message)
        }
    })
//.get para traer los productos en el carrito.
    .get('/:id/productos', (req,res)=>{
        try{
            res.status(200).json(storeCart.getProductsInCart)
        }catch (error) {
            res.status(500).json(error.message)
        }
    })
//.post para generar el carrito.
    .post('/', (req,res=>{
        try{
            res.status(200).json(storeCart.addCart)
        }catch (error) {
            res.status(500).json(error.message)
        }
    }))
//.post para añadir producto al carrito por su id.
    .post('/:id/productos', (req,res)=>{
        try {
            const id = Number(req.params.id)
            const body = req.body
            const producto = storeCart.addProductToCart(id,body)
            res.status(200).json(producto)
        } catch (error) {
            res.status(500).json(`se produjo: ${error.message}`)
        }
    })
//.post para generar el producto al listado.
    .post('/',(req,res)=>{
        try {   
            if(req.body.title && req.body.price){
                const product = storeProductos.saveProduct(req.body)
                res.status(201).json(product)
            }else{
                res.status(400).json({
                    error: 'complete los datos requeridos'
                })
            }
            
        } catch (error) {
            res.status(500).json(error.message)
        }
    })
//.put para actualizar un producto por su id.
    .put('/:idProduct', (req,res) =>{
         try {
             const id = Number(req.params.id)
             const producto = storeProductos.updateProductById(id,req.body)
             res.status(200).json(producto)
         } catch (error) {
             res.status(500).json(error.message)
         }
    })    
//.delete para eliminar un producto por su id.
    .delete('/:id/productos/:id_prod', (req,res)=>{
        try {
            const id = Number(req.params.id)
            storeCart.deleteProductInCart(id)
            res.status(200).json('eliminado')
        } catch (error) {
            res.status(500).json(`No se pudo eliminar el producto del carrito : ${error.message}`)
        }
    })
//.delete para borrar todo el carrito.
    .delete('/:id', (req,res)=>{
        try {
            res.status(200).json(storeCart.deleteCart)
        } catch (error) {
            res.status(500).json(error.message)
        }
    })
//.delete para borrar un producto por su id.
    .delete('/:idProduct', (req,res)=>{
        try {
            const id = Number(req.params.idProduct)
            storeProductos.deleteProductById(id)
            res.status(200).json("Eliminado")
        } catch (error) {
            res.status(500).json(`No se pudo borrar el producto ${error.message}`)
        }

    })
 

    const server = app.listen(PORT,()=> console.log(`servidor corriendo en el puerto ${PORT}`))
    server.on('error',(err) =>console.log(err.message))