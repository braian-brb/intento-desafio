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


const Container = require(/desafioBraianBilicic/container.js)

app.get('/products', (req, res) => {
    res.send(Container.getAll());
})