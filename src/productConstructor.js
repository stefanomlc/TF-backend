import { v4 as uuidv4 } from 'uuid';

export default class productConstructor {
    constructor ({ title, description, code, price, status, stock, category, thumbsnails}) { //falta corroborar que sean del tipo de cada uno

        this.id = uuidv4() //falta buscar el ID
        if (!title) throw new Error("falta el titulo")
        this.title = title

        if (!description) throw new Error("falta la descripción")
        this.description = description

        if (!code) throw new Error("falta el codigo")
        this.code = code

        if (!price) throw new Error("falta el precio")
        this.price = price

        if (!status) throw new Error("falta el estado")
        this.status = status

        if (!stock) throw new Error("falta el stock")
        this.stock = stock

        if (!category) throw new Error("falta el la categoria")
        this.category = true

        if (!thumbsnails) {this.thumbsnails = "#"} else {
            this.thumbsnails = thumbsnails
        }
    }
}