'use strict'
require('dotenv').config();
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;
var app = express();

var server = require('http').createServer(app);

var admin_routes = require('./routes/admin');
var create_routes = require('./routes/create');
var delete_routes = require('./routes/delete');
var filter_routes = require('./routes/filter');
var list_routes = require('./routes/list');
var update_routes = require('./routes/update');


mongoose.connect('mongodb://127.0.0.1:27017/buzon')
  .then(() => console.log('Connected!'));

//console.log("Corriendo....");
server.listen(port, function(){
    console.log("Servidor " + port );
});
/*
mongoose.connect('mongodb://127.0.0.1:27017/buzon',{useUnifiedTopology: true, useNewUrlParser: true}, (err,res)=>{
    if(err){          
        console.log(err);
        throw err;
    }else{
        

    }
});*/

 /*Multiparty se hace cargo*/
app.use(bodyparser.urlencoded({limit: '200mb',extended:true}));
app.use(bodyparser.json({limit: '200mb', extended: true}));


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api/helper',admin_routes);
app.use('/api/create',create_routes);
app.use('/api/delete',delete_routes);
app.use('/api/filter',filter_routes);
app.use('/api/list',list_routes);
app.use('/api/update',update_routes);

module.exports = app;