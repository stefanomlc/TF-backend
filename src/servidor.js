import express from 'express'
import { Manager } from './managers/Manager.js';
import productConstructor from './productConstructor.js';
import cartConstructor from "./cartConstructor.js";
import { cartManager } from "./managers/cartManager.js";
//import routerCart from './routerCart.js';

//socket.io
import {Server} from "socket.io";

//handlebars
import {engine} from 'express-handlebars'

//app express y managers
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const manager = new Manager()
const CartManager = new cartManager()

//carpeta static
app.use("/static", express.static("public")) //carpeta
//esto iria pero se importo antes: app.use(express.json())


//ahora van los handlebars
app.engine("handlebars", engine()) //motor
app.set("views", "./views")  //carpeta de donde saco
app.set("view engine", "handlebars") //extensión por defecto



app.get('/api/products', (req, res) => {
    const id = req.query.id
    
    let products = manager.getProductByLimit('id', parseInt(id))
  
    const cantidad = parseInt(req.query.limit)
    if (cantidad) {
        products = products.slice(0, cantidad)
    }
    res.render("home", { allProducts: products })
    //res.json(products)
})


app.get('/api/:pid', (req, res) => {
    const id = req.params.id
    const product = manager.getProductByLimit('pid', parseInt(id))
    res.json(product)
}) 

app.post("/api/products" , (req, res) => {
    try {
        const productData = req.body
        //productData.shift(id)
        console.log(productData)
        const product = new productConstructor (productData)
        console.log(product)
        const productSave = manager.saveProduct(product)
        console.log(productSave)
        res.status(201).json(productSave)
    } catch{
        res.status(400).json({ msg: error.message})
    }
})

app.put("/api/products", (req, res) => {
    
        const field = req.query.field
        const value = req.query.value
        const product = req.query.product

        manager.updateProduct(product, field, value)

        res.json('Valor actualizado')
        

} )
app.delete("/api/products" , (req, res) => {
    try {
        const product = req.query.product
        manager.deleteProduct(product)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({ msg: error.message})

    }

} )

//app.use('/api/carts', routerCart)

app.post('/api/carts',(req,res) =>{
    try {
        res.params
        //let id = CartManager.cartId()
        let id = 11
        const cart = new cartConstructor(id)
        console.log(cart)
        const cartSave = manager.cartSave(cart)
        console.log(cartSave)
        res.status(201).json(cartSave)
    } catch{
        res.status(400).json({ msg: error.message})
    }

} )

// hay que crear una constante para vincular el servidor
const servidorConectado = app.listen(8080, () => {
    console.log('Acceso  al servidor listo!')
})

//creo el servidor en base a lo anterior
const io = new Server(servidorConectado)
