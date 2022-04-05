const express = require('express');

const app = express();

app.get('/',(req,res)=>{
res.send('Hola Express');
});

app.listen(3002,()=>{
    console.log('Servidor Iniciado . . .');
});