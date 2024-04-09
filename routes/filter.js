const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticate'); // Importar middleware de autenticación
const Controller = require('../controllers/ObtenerModel'); // Importar controlador

// Rutas para obtener elementos de diferentes modelos
router.get('/obtener_usuario/:id', auth.auth, Controller.obtenerUsuario);
router.get('/obtener_actividad_proyecto/:id', auth.auth, Controller.obtenerActividadProyecto);
router.get('/obtener_incidente_denuncia/:id', auth.auth, Controller.obtenerIncidenteDenuncia);
router.get('/obtener_categoria/:id', auth.auth, Controller.obtenerCategoria);
router.get('/obtener_subcategoria/:id', auth.auth, Controller.obtenerSubcategoria);
router.get('/obtener_encargado_categoria/:id', auth.auth, Controller.obtenerEncargadoCategoria);
router.get('/obtener_rol_usuario/:id', auth.auth, Controller.obtenerRolUsuario);
router.get('/obtener_estado_incidente/:id', auth.auth, Controller.obtenerEstadoIncidente);
router.get('/obtener_estado_actividad_proyecto/:id', auth.auth, Controller.obtenerEstadoActividadProyecto);
router.get('/obtener_tipo_actividad_proyecto/:id', auth.auth, Controller.obtenerTipoActividadProyecto);
router.get('/obtener_direccion_geo/:id', auth.auth, Controller.obtenerDireccionGeo);
router.post('/verificar_permiso', auth.auth, Controller.verificarPermiso);
router.get('/obtener_permisosrol/:id', auth.auth, Controller.obtenerPermisosRol);

module.exports = router;
