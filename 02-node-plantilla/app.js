const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('./public'));
app.set('view engine', 'pug');


app.get('/',(request,response)=>{
    response.render('index', { title: 'Hey', message: 'Hello there!'});
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })