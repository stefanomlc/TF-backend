const socket = io()


document.querySelector('#btnNuevoProd')?.addEventListener('click', ev => {
    const inputTitle = document.querySelector('#inputTitle')
    const inputDescription = document.querySelector('#inputDescription')
    const inputPrice = document.querySelector('#inputPrice')
    const inputThumbnail = document.querySelector('#inputThumbnail')
    const inputCode = document.querySelector('#inputCode')
    const inputStock = document.querySelector('#inputStock')

    if (inputTitle instanceof HTMLInputElement &&
        inputDescription instanceof HTMLInputElement &&
        inputPrice instanceof HTMLInputElement &&
        inputThumbnail instanceof HTMLInputElement &&
        inputCode instanceof HTMLInputElement &&
        inputStock instanceof HTMLInputElement &&
        inputTitle.value &&
        inputDescription.value &&
        inputPrice.value &&
        inputThumbnail.value &&
        inputCode.value &&
        inputStock.value ) {

        const prod = {
            title: inputTitle.value,
            description: inputDescription.value,
            price: inputPrice.value,
            thumbnail: inputThumbnail.value,
            code: inputCode.value,
            stock: inputStock.value,
        }
        socket.emit('newProduct', prod)
    }
    // como obtengo los datos del producto es frontend, no nos interesa
})

socket.on('actualizarProductos', productos => {
    const productsDiv = document.querySelector('#products')
    if (productsDiv) {
        productsDiv.innerHTML = JSON.stringify(productos, null, 2)
    }
    // como muestro los datos es frontend, no nos interesa
})

socket.on("updateProducts", products => {
    const productsDiv = document.querySelector("#products")
    if (productsDiv){
        productsDiv.innerHTML = JSON.stringify(products, null, 2) 
    }
})

socket.emit('refresh')