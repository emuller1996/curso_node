const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.get('/',(req,res) => {
  res.send('./public/index.html');
});

app.get('/servicios',(req,res) => {
  res.send('public/servicios.html',);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})