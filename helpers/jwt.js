'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Municipio2024';

exports.createToken = function(user,time,tipo){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        cedula: user.cedula,
        correo: user.correo,
        rol_user:user.rol_user,
        iat: moment().unix(),
        exp: moment().add(time||3,tipo||'hours').unix()
    }

    return jwt.encode(payload,secret);
}

exports.sign = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        base:user.base,
        iat: moment().unix(),
        exp: moment().add(300,'minutes').unix()
    }

    return jwt.encode(payload,secret);
}
