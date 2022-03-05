const express = require('express');
const moment = require('moment');
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listing in port ${server.address().port}`);
});
server.on('error', error => console.log(`Error in server ${error}`));


const modulo = require("./container.js")


const container = new modulo.Container("./productos.txt")

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



 


app.get('/products', (req, res) => {
    async function ejecutar() {
        res.send(await container.getAll());
    }
    ejecutar();
})




app.get('/productRandom', (req, res) => {

    async function test() {
        const arrayObjets = await container.getAll()
        const min = 1;
        const max = arrayObjets.length;
        const random = Math.floor(Math.random() * (max - min)) + min;
        res.send(await container.getById(random));
    }
    
    test();
}
)

async function saveProductsTest() {

    await container.save(objetoPrueba);
    await container.save(objetoPrueba2);
    await container.save(objetoPrueba3);
    await container.save(objetoPrueba4);
    
}


app.get('/save',  (req, res) => {
    async function saveProducts() {
        await saveProductsTest();
        res.send('Guardado');
    }
    saveProducts();
})

app.get('/delete', (req, res) => {
    async function ejecutar() {
        await container.deleteAll();
        res.send('Borrado');
    }
    ejecutar();
   
})

