const express = require('express');

const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now  = new Date().toString();
  var log = `${now} : ${req.method} ${req.url} \n`;
  fs.appendFile('server.log',log,(err)=>{
    if(err!=null)
      console.log('Unable to append in the file');
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('upperCase',(text)=>{
  return text.toUpperCase();
})

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle : "Home Page",
    welcomMessage : "Welcome Ajay"
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle : "About Page"
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage : "Bad Request"
  });
});

app.get('/maintenance',(req,res)=>{
  res.send({
    message : "site under maintenance"
  });
});


app.listen(3000,()=>{
  console.log('Server is up to 3000 port');
});
