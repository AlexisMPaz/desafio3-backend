import express from 'express'
import { promises as fs } from 'fs'

const dataPath = "./src/data.json"
const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Bienvenido al servidor de Isla de Marea")
})

app.get('/products', async (req, res) => {
    const dataBase = await fs.readFile(dataPath, 'utf-8');
    const aux = JSON.parse(dataBase);
    let {limit} = req.query;
    if(limit) {
        const products = aux.slice(0, limit)
        res.send(`Mostrando ${limit} producto/productos: ${JSON.stringify(products)}}`)
    } else {
        res.send(`Mostrando todos los productos: ${JSON.stringify(aux)}}`)
    }
})

app.get('/products/:idProduct', async (req, res) => {
    const dataBase = await fs.readFile(dataPath, 'utf-8');
    const aux = JSON.parse(dataBase);
    const idProduct = req.params.idProduct;
    const product = aux.find(prod => prod.id === parseInt(idProduct));
    if(product) {
        res.send(`Producto encontrado: ${JSON.stringify(product)}`)
    } else {
        res.send(`El producto con ID: ${idProduct} no existe`)
    }
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})