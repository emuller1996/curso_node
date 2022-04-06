const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('./public'));



app.get('/',(req,res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/Servicios',(req,res) => {
  res.sendFile(path.resolve(__dirname,'public/servicios.html'));
});

app.get('/Contacto',(req,res) => {
  res.sendFile(path.resolve(__dirname,'public/Contacto.html'));
});

app.use(function(req, res, next) {
  res.status(404).sendFile(path.resolve(__dirname,'public/404.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})