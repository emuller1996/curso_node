const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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
    response.render('team');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })