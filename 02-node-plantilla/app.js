const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const app = express();
const port = 3000;


mongoose.connect("mongodb://127.0.0.1:27017/todos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Conexion a la BD exitosa...");
});

connection.on("error", (err) => {
  console.error(`Error en la  conexion a la  BD : ${err.message}`);
});

//Model Peronas
const Personas = mongoose.model("Personas", {
  nombre: String,
  apellido: String,
  edad: String,
  profeciones: Object
});






app.use(express.static('./public'));
app.set('view engine', 'pug');


app.get('/',(request,response)=>{
    response.render('index');
});

app.get('/Servicios',(request,response)=>{
    response.render('services');
});

app.get('/Contacto',(request,response)=>{
    response.render('contact');
});

app.get('/Equipo',(request,response)=>{
    Personas.find()
    .then(personas => {     
        response.render('team',{ data: personas });
    })
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })