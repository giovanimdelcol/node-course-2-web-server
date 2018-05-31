//aqui configuraramos as routes, root do site, paginas
//e onde starta o server binding com uma porta.
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log')
        }
    });
    next();   
});
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs', {});
// });

//eh importante deixar os arquivos estaticos abaixo
//pois o maitenance executara antes deles, caso contrario
//os arquivos publicos ficarao acessivesi antes de as funcoes
//do middleware sejam disparadas
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase() ;
});
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express</h1>');
//   res.send({
//       name:'Helloo via JSON2',
//       likes: [
//           'Biking',
//           'archery'
//       ]
//   });
  res.render('home.hbs', {
      welcomeMsg:'olar',
      pageTitle:'Home Pg Dinamica :)'
  })
} );

app.get('/about',(req,res)=> {
    res.render('about.hbs',{
        pageTitle:'About Pg Dinamica :)'
    });
 // res.send('About Page');
});

app.get('/bad', (req, res)=>{
    res.send({
      msg:'Erro - nao foi possivel carregar'  
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});