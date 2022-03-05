const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listing in port ${server.address().port}`);
});
server.on('error', error => console.log(`Error in server ${error}`));


//utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.
const modulo = require("./container.js")
const container = new modulo.Container("./productos.txt")


//4 productos de prueba para este ejercicio
//Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

let objetoPrueba = {
    title: "Pinza Bremen",
    price: 3500,
    thumbnail: 'Imagen Pinza Bremen'
}

let objetoPrueba2 = {
    title: "Amoladora Bosch",
    price: 9800,
    thumbnail: 'Imagen Amoladora Bosch'
}

let objetoPrueba3 = {
    title: "Destornillador",
    price: 2300,
    thumbnail: 'Imagen Destornillador'
}

let objetoPrueba4 = {
    title: "Espatula",
    price: 250,
    thumbnail: `Imagen Espatula`
}


app.get('/', (req, res) => {
    res.send("Desafio Servidor Braian Bilicic")
})

// Ruta get '/productos' que devuelva un array con todos los productos  
// disponibles en el servidor
app.get('/products', (req, res) => {
    async function productsFunction() {
        res.send(await container.getAll());
    }
    productsFunction();
})

// Ruta get '/productoRandom' que devuelva un producto elegido al azar 
// entre todos los productos disponibles
app.get('/productRandom', (req, res) => {
    async function productRandomFunction() {
        const arrayObjets = await container.getAll()
        const min = 1;
        const max = arrayObjets.length;
        const random = Math.floor(Math.random() * (max - min)) + min;
        res.send(await container.getById(random));
    }
    productRandomFunction();
}
)

//Funcion async del save para no poner todo adentro del get
async function saveProducts() {
    await container.save(objetoPrueba);
    await container.save(objetoPrueba2);
    await container.save(objetoPrueba3);
    await container.save(objetoPrueba4);
}

//Este metodo get es para guardar productos y asi probar que funcionen los metodos de la clase contenedor 
app.get('/save',  (req, res) => {
    async function saveFunction() {
        await saveProducts();
        res.send('Saved 4 new products');
    }
    saveFunction();
})

//Este metodo get los elimina y deja el contenedor vacio
app.get('/delete', (req, res) => {
    async function deleteFunction() {
        await container.deleteAll();
        res.send('Delete');
    }
    deleteFunction();
   
})

