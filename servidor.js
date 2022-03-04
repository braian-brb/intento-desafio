const express = require('express');
const moment = require('moment');
const app = express();
const PORT = process.env.PORT || 1337;
const server = app.listen(PORT, () => {
    console.log(`Listing in port ${server.address().port}`);
});
server.on('error', error => console.log(`Error in server ${error}`));

app.get('/', (req, res) => {
    res.send(' <h1 style="color: blue"> Bienvenidos al servidor express</h1>');
})

let visits = 0;
app.get('/visit', (req, res) => {
    visits++;
    res.send(`La cantidad de visitas es ${visits}`);
})

app.get('/fyh', (req, res) => {
    res.send({fyh: moment().format('YYYY/MM/DD HH:mm:ss')});
})


const modulo = require("./container.js")


const contenedor = new modulo.Container("./prueba.txt")

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

async function guardarDatosPrueba() {

    await contenedor.save(objetoPrueba);
    await contenedor.save(objetoPrueba2);
    await contenedor.save(objetoPrueba3);
    await contenedor.save(objetoPrueba4);
    
}


 


app.get('/products', (req, res) => {
    async function ejecutar() {
        res.send(await contenedor.getAll());
    }
    ejecutar();
})


app.get('/productRandom', (req, res) => {
    async function ejecutar() {
        
        const arrayObjetos = await (contenedor.getAll())
        const min = 1;
        const max = arrayObjetos.length;
        const random = Math.floor(Math.random() * (max - min)) + min;


        res.send(await contenedor.getById(random));
    }

    ejecutar();

}
)

app.get('/save',  (req, res) => {
    console.log('Se guardaron archivos')
    async function guardarDatos() {
        
        await guardarDatosPrueba();
    }
    guardarDatos();
    
})

app.get('/delete', (req, res) => {
    async function ejecutar() {
        
        res.send(await contenedor.deleteAll());
    }
    ejecutar();
    res.send(("Borrando productos del archivo"))
})

