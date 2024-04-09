'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegistroSchema = Schema({
    usuario: {type: Schema.ObjectId, ref: 'usuario', required: true},
    tipo: {type: String, require: true},
    descripcion: {type: String, require: true}, 
    createdAt: {type:Date, default: Date.now, require: true}
});

module.exports =  mongoose.model('registro',RegistroSchema);
//module.exports=RegistroSchema;