const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const puerto = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

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
});

app.get("/", (req, res) => {
  res.json({ response: "Success" });
});

app.post("/addPersona", (req, res) => {
  const persona = new Personas({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
  });

  persona.save()
  .then(doc =>{
    console.log('Insertado Correctamente . . .',doc);
    res.redirect('/')
  }).catch(error => console.log(error));
});

app.get('/getPersonas', (req,res)=>{
    Personas.find()
    .then(personas => { 
        res.json(personas);
    })
});

app.get('/persona/:id',(req, res)=>{
  Personas.find({_id:req.params.id})
  .then(persona => res.send(persona));
});

app.get('/update' , (req,res)=>{
  res.send("sej")
});

app.listen(puerto, () => {
  console.log(`Servidor Listo en el Puerto : ${puerto}`);
});
