'use strict'

const express = require('express');
const AdminController = require('../controllers/AdminController');
const Sinarp = require('../services/sinarp');

const api = express.Router();
const auth = require('../middlewares/authenticate');
const multiparty = require('connect-multiparty');
const path = multiparty({uploadDir: './uploads/instituciones'});

api.get('/obtener_portada/:img',AdminController.obtener_portada);
api.get('/obtener_portada_avatar/:img',AdminController.obtener_portada_avatar);
api.get('/obtener_portada_ficha/:img',AdminController.obtener_portada_ficha);
api.get('/obtener_portada_barrio/:img',AdminController.obtener_portada_barrio);
api.post('/newpassword',auth.auth,AdminController.newpassword);
api.post('/forgotpassword',AdminController.forgotpassword);
api.post('/login_admin',AdminController.login_admin);
api.get('/listar_registro',auth.auth,AdminController.listar_registro);
api.get('/verificar_token', auth.auth, AdminController.verificar_token);
api.get('/verificarcorreo/:id', AdminController.verificarCorreo);

api.get('/getciudadano/:id', async (req, res) => {
    var id = req.params['id'];
    console.log(id);
    try {
        const ciudadano = await Sinarp.getCiudadano(id);
        res.status(200).json(ciudadano);
    } catch (error) {
        console.error('Error al obtener ciudadano:', error);
        res.status(500).json({ message: 'Error al obtener ciudadano' });
    }
});


module.exports = api;