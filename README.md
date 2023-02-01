# desafio3-backend

Servidor con Express

Alexis Paz

Servidor creado en el puerto local 8080

Proceso de Testing:

-http://localhost:8080/products sin query, eso debe devolver todos los 10 productos.

-http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos.
(Funciona con cualquier limite menor o igual a 10, en caso de poner mas de 10 mostrara todos los productos)

-http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2
(Hay productos con id del 1 al 10, se puede testear con cualquiera de ellos)

-http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe.
(Muestra en pantalla que el producto con el id ingresado no existe)




