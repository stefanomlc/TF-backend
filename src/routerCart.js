import { Router } from "express";
import cartConstructor from "./cartConstructor.js";
import { cartManager } from "./managers/cartManager.js";


const routerCart = Router()
const CartManager = new cartManager()

routerCart.post('/',(req,res) =>{
    try {
        req
        let id = Manager.cartId()
        const cart = new cartConstructor(id)
        console.log(cart)
        const cartSave = manager.cartSave(cart)
        console.log(cartSave)
        res.status(201).json(cartSave)
    } catch{
        res.status(400).json({ msg: error.message})
    }

} )

export default routerCart