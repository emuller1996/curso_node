const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { json } = require('express/lib/response');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('./public'));


app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/html');
    res.sendFile('./public/index.html');
});

app.get('/peliculas' , (req,res) =>{

    const file = fs.readFileSync('./peliculas.json','utf-8');


    res.setHeader('Content-type','text/json');
    res.send(file);
});

app.post('/store',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    const nombre = req.body.nombre;
    const calificacion = req.body.calificacion;

    //Open File
    let file = fs.readFileSync('./peliculas.json','utf-8');
    //Convert to Arrray
    const mijson = JSON.parse(file);

    //insert New Element
    mijson.peliculas.push({"nombre" : nombre , "calificacion" : parseInt(calificacion)});
    //save json in the file
    file =fs.writeFileSync('./peliculas.json',JSON.stringify(mijson));


    res.send('Datos Guardado con Exito');
});


app.listen('3008',()=>{
    console.log('Servidor Corriendo');
});

