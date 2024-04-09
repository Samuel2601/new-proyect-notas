const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticate'); // Importar middleware de autenticación
const Controller = require('../controllers/EliminarModel'); // Importar controlador

// Rutas para eliminar elementos de diferentes modelos
router.delete('/eliminar_usuario/:id', auth.auth, Controller.eliminarUsuario);
router.delete('/eliminar_actividad_proyecto/:id', auth.auth, Controller.eliminarActividadProyecto);
router.delete('/eliminar_incidente_denuncia/:id', auth.auth, Controller.eliminarIncidenteDenuncia);

router.put('/eliminar_categoria/:id', auth.auth, Controller.eliminarCategoria);
router.put('/eliminar_subcategoria/:id', auth.auth, Controller.eliminarSubcategoria);

router.delete('/eliminar_encargado_categoria/:id', auth.auth, Controller.eliminarEncargadoCategoria);
router.delete('/eliminar_rol_usuario/:id', auth.auth, Controller.eliminarRolUsuario);
router.delete('/eliminar_estado_incidente/:id', auth.auth, Controller.eliminarEstadoIncidente);
router.delete('/eliminar_estado_actividad_proyecto/:id', auth.auth, Controller.eliminarEstadoActividadProyecto);
router.delete('/eliminar_tipo_actividad_proyecto/:id', auth.auth, Controller.eliminarTipoActividadProyecto);
router.delete('/eliminar_direccion_geo/:id', auth.auth, Controller.eliminarDireccionGeo);
router.delete('/eliminar_permisos/:id', auth.auth, Controller.eliminarPermiso);

router.get('/verificar_categoria/:id', auth.auth, Controller.verificarCategoria);
router.get('/verificar_subcategoria/:id', auth.auth, Controller.verificarSubCategoria);
module.exports = router;
