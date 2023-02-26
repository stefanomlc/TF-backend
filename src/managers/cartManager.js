import fs from 'fs';

export class cartManager {
    constructor () {
        this.carts = []
    }

    async cartId (){
        const DataBase = this.loadCartDB()
        if (DataBase.length === 0){
            return 0
        } else {
            const newId = DataBase[DataBase.length]
            return newId

        }

    }

    addCart(){

    }

    addCartProduct(){

    }

    getCartInfo(){

    }

    async loadCartDB(){
        const loadCart = await fs.promises.readFile("./src/DataBase/cart.JSON", "utf-8");

        const carts = await JSON.parse(loadCart)

        for (let key in carts) {
            this.elements.push(carts[key]);
        }
        //console.log(this.elements)
        return this.carts

    }

    async saveCartDB(){
        const Datos = this.carts;
        const DatosJson = JSON.stringify(Datos);
        await fs.promises.writeFile("./src/DataBase/cart.JSON", DatosJson)
    }
}