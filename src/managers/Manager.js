import fs from "fs";
import { title } from "process";



//const fs = require("fs");
//const { } = require('fs')

export class Manager {
    constructor() {
        this.elements = [ ]
    }

    getProductByLimit(identifcator, value) {
        //this.elements = []
        //let products
  
        this.loadAllProducts()
            //console.log("tiene cosas", this.elements)
        
        //this.loadAllProducts()

        if (identifcator && value) {
            return this.elements.filter(e => {
                return e[identifcator] === value
            })
        } else {
            return this.elements
            
        }
    }

    async saveProduct(product) {
        //falta el async y await para cargar el json, cargar y guardar
        await this.loadAllProducts()
        this.elements.push(product)
        await this.saveAllProducts()
        return product

    }

    async saveAllProducts(){
        const Datos = this.elements;
        const DatosJson = JSON.stringify(Datos);
        await fs.promises.writeFile("./src/DataBase/products.JSON", DatosJson)

    }

    async updateProduct(product, field, value){
        //cargo los productos
        await this.loadAllProducts()

        if (field == 'price' || field == 'stock') {
            console.log('cumplio la condicion')
            //Busco el index del array
            const index = this.elements.findIndex(prod => prod.title === product)
            //actualiza un solo valor en number 
            this.elements[index][field] = parseInt(value)
            
        } else {
            console.log('NO cumplio la condicion')
            //Busco el index del array
            const index = this.elements.findIndex(prod => prod.title === product)
            //actualiza un solo valor
            this.elements[index][field] = value
            
        }

        await  this.saveAllProducts()
        return console.log('proceso finalizado')


    }

    async deleteProduct (product) {
        await this.loadAllProducts()
        //carga de productos
        const index = this.elements.findIndex(prod => prod.title === product)
        // borrado del array
        const newAllProducts = this.elements.splice((index),1)
        await  this.saveAllProducts()
        return
    }


    async loadId(){


    }

    async loadAllProducts(){
        
        //console.log("cargamos")
        const loadProducts = await fs.promises.readFile("./src/DataBase/products.JSON", "utf-8");

        const products = await JSON.parse(loadProducts)

        for  (let key in products) {
            this.elements.push(products[key]);
        }
        //console.log(this.elements)
        return this.elements

    }
} 