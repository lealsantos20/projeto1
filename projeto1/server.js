var express = require('express');
var bodyParser=require('body-parser');
var fs=require('fs');

var app=express();

app.use(function(req,res,next){
    res.setHeader('Acess-Control-Allow-Origin','*');
    res.setHeader('Acess-Control-Allow-Method','GET, POST, PUT, DELETE');
    res.setHeader('Conten-Type','application/json');
    res.setHeader('Acess-Control-Allow-Credentials',true);
    next();
})
app.use(bodyParser.urlencoded({extended:false}))

//parse application/json
app.use(bodyParser.json())

app.listen(3000,function(){
    console.log('Servidor Web rodando na porta 3000');
});

// busca usuarios
app.get('/api',function(req,res){
    fs.readFile('usuarios.json', 'utf8', function(err,data){
        
        if(err){
            var response={status:'falha','resultado': err}
            res.json(response);
        }else{
            var obj=JSON.parse(data);
            var result = [];

            if(typeof req.query.usuario_id !== 'undefined'){ //confere se o usuario definiu o parametro usuario_id

            obj.usuarios.forEach(function(usuario){
                    if(usuario.usuario_id==req.query.usuario_id){
                    result=usuario;
                        }
                    });
                }else{
                    result=obj.usuarios;
                }
            var response={status:'sucesso','resultado':result};
            res.json(response);

        }
    });
});

app.post('/api',function(req,res){
    fs.readFile('usuarios.json','utf8',function(err,data){

        if(err){
            var response={status:'falha',resultado:err};
            }
            else{
                var obj =JSON.parse(data);
                //implementa id autonaticamente
                req.body.usuario_id=obj.usuarios.length+1

                obj.usuarios.push(req.body);
                
                fs.writeFile('usuarios.json',JSON.stringify(obj),function(err){
                    if(err){
                        var response={status:'falha',resultado:err};
                    }
                    else{
                        var response={status:'sucesso',resultado:'Registro incluido'};
                        res.json(response);
                }
            });

        }

    });
});