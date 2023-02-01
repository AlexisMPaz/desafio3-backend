import express from 'express'
import ProductManager from './ProductManager.js'

const dataPath = "./src/data.json"
const manager = new ProductManager(dataPath);
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Bienvenido al servidor de Isla de Marea")
})

app.get('/products', async (req, res) => {
    const data = await manager.getProducts()
    let {limit} = req.query;
    if(limit) {
        const products = data.slice(0, limit)
        res.send(`Mostrando ${limit} producto/productos: ${JSON.stringify(products)}}`)
    } else {
        res.send(`Mostrando todos los productos: ${JSON.stringify(data)}}`)
    }
})


app.get('/products/:idProduct', async (req, res) => {
    const idProduct = req.params.idProduct;
    const data = await manager.getProductByID(parseInt(idProduct))
    if(data) {
        res.send(`Producto encontrado: ${JSON.stringify(data)}`)
    } else {
        res.send(`El producto con ID: ${idProduct} no existe`)
    }
})



app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})