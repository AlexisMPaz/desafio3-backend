import { promises as fs } from 'fs'

// Clases para Manager y Producto
class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(newProduct) {
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)) {
            console.error("Error 1: No se ha podido agregar el producto ya que posee campos incompletos");

        } else {
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.code === newProduct.code);

            if (!product) {
                aux.push({ ...newProduct, id: ProductManager.idGenerator() });
                await fs.writeFile(this.path, JSON.stringify(aux))

            } else {
                console.error("Error 2: El producto esta repetido");
            }
        }
    }

    async getProducts() {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        return aux;
    }


    async getProductByID(idProduct) {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const product = aux.find(prod => prod.id === idProduct);
        if (product) {
            return product;
        } else {
            return null;
        }
    }

    async updateProduct(newProduct, idProduct) {
        if (Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)) {
            console.error("Error 1: No se ha podido agregar el producto ya que posee campos incompletos")

        } else {
            const dataBase = await fs.readFile(this.path, 'utf-8');
            const aux = JSON.parse(dataBase);
            const product = aux.find(prod => prod.id === idProduct);
            if(product) {
                const indice = aux.findIndex(prod => prod.id === idProduct);
                aux[indice] = {...newProduct, id:idProduct};
                await fs.writeFile(this.path, JSON.stringify(aux));
                console.log(`El producto (id:${idProduct}) ha sido actualizado`);
            } else {
                console.log("Error 3: Producto no encontrado");
            }
        }
    }

    async deleteProduct(idProduct) {
        const dataBase = await fs.readFile(this.path, 'utf-8');
        const aux = JSON.parse(dataBase);
        const product = aux.find(prod => prod.id === idProduct);
        if(product) {
            const newArray = aux.filter(prod => prod.id !== idProduct)
            await fs.writeFile(this.path, JSON.stringify(newArray));
            console.log(`El producto (id:${idProduct}) ha sido eliminado`);
        } else {
            console.log("Error 3: Producto no encontrado");
        }
    }

    //Metodo estatico para generar ID al cargar producto
    static idGenerator() {
        this.generatedID ? this.generatedID++ : this.generatedID = 1;
        return this.generatedID;
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}


// Creacion de los productos

const product1 = new Product("Mjölner", "Maza", 200, "Sin Imagen", "a0", 30);
const product2 = new Product("Praxis", "Anillo", 300, "Sin Imagen", "a1", 30);
const product3 = new Product("Impresencia", "Amuleto", 500, "Sin Imagen", "a2", 30);
const product4 = new Product("Oni-Goroshi", "Espada", 600, "Sin Imagen", "a3", 30);
const product5 = new Product("Astramentis", "Amuleto", 360, "Sin Imagen", "a4", 30);
const product6 = new Product("La Torre de Marfil", "Armadura Corporal", 1000, "Sin Imagen", "a5", 30);
const product7 = new Product("Mandato de la Fosa", "Guantes", 150, "Sin Imagen", "a6", 30);
const product8 = new Product("Mascara de Tribunal", "Casco", 700, "Sin Imagen", "a7", 30);
const product9 = new Product("Atadura de Alma", "Cinturon", 450, "Sin Imagen", "a8", 30);
const product10 = new Product("El sacrificio de Oro", "Espada", 950, "Sin Imagen", "b9", 30);


// Cargar productos

/*
const loadData = async () => {
    await fs.writeFile(dataPath, "[]") //Iniciar base de datos con array vacio (archivo de texto)

    //Productos cargados
    await manager1.addProduct(product1);
    await manager1.addProduct(product2);
    await manager1.addProduct(product3);
    await manager1.addProduct(product4);
    await manager1.addProduct(product5);
    await manager1.addProduct(product6);
    await manager1.addProduct(product7);
    await manager1.addProduct(product8);
    await manager1.addProduct(product9);
    await manager1.addProduct(product10);

   
    await manager1.getProducts(); //Productos mostrados por consola
}

loadData();
*/

export default ProductManager;