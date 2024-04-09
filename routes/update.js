'use strict'

const express = require('express');
const Controller = require('../controllers/ActualizarModel');

const router = express.Router();
const auth = require('../middlewares/authenticate');
const multiparty = require('connect-multiparty');
var path = new multiparty({
    uploadDir: './uploads/avatar/',
    maxFieldsSize: 50 * 1024 * 1024});
  
// Rutas para la actualización de diferentes modelos
router.put('/actualizar_usuario/:id', [auth.auth,path], Controller.actualizarUsuario);
router.put('/actualizar_actividad_proyecto/:id', auth.auth, Controller.actualizarActividadProyecto);
router.put('/actualizar_incidente_denuncia/:id', auth.auth, Controller.actualizarIncidenteDenuncia);
router.put('/actualizar_categoria/:id', auth.auth, Controller.actualizarCategoria);
router.put('/actualizar_subcategoria/:id', auth.auth, Controller.actualizarSubcategoria);
router.put('/actualizar_encargado_categoria/:id', auth.auth, Controller.actualizarEncargadoCategoria);
router.put('/actualizar_rol_usuario/:id', auth.auth, Controller.actualizarRolUsuario);
router.put('/actualizar_estado_incidente/:id', auth.auth, Controller.actualizarEstadoIncidente);
router.put('/actualizar_estado_actividad_proyecto/:id', auth.auth, Controller.actualizarEstadoActividadProyecto);
router.put('/actualizar_tipo_actividad_proyecto/:id', auth.auth, Controller.actualizarTipoActividadProyecto);
router.put('/actualizar_direccion_geo/:id', auth.auth, Controller.actualizarDireccionGeo);
router.put('/actualizar_permisos/:id', auth.auth, Controller.actualizarPermiso);

module.exports = router;