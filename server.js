var express = require('express');
var bodyParser=require('body-parser');
var fs=require('fs');

var app=express();

app.use(function(req,res){
    res.setHeader('Acess-Control-Allow-Origin','*');
    res.setHeader('Acess-Control-Allow-Method','GET, POST, PUT, DELETE');
    res.setHeader('Conten-Type','application/json');
    res.setHeader('Acess-Control-Allow-Credentials',true);
    res.end();
})

app.listen(3000,function(){
    console.log('Servidor Web rodando na porta 3000');

})