const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticate'); // Importar middleware de autenticación
const Controller = require('../controllers/ListarModel'); // Importar controlador

// Rutas para listar elementos de diferentes modelos
router.get('/listar_usuarios', auth.auth, Controller.listarUsuarios);
router.get('/listar_ficha_sectorial', auth.auth, Controller.listarActividadesProyecto);
router.get('/listar_incidentes_denuncias', auth.auth, Controller.listarIncidentesDenuncias);
router.get('/listar_categorias', auth.auth, Controller.listarCategorias);
router.get('/listar_subcategorias', auth.auth, Controller.listarSubcategorias);
router.get('/listar_encargados_categorias', auth.auth, Controller.listarEncargadosCategorias);
router.get('/listar_roles_usuarios', auth.auth, Controller.listarRolesUsuarios);
router.get('/listar_estados_incidentes', auth.auth, Controller.listarEstadosIncidentes);
router.get('/listar_estados_actividades_proyecto', auth.auth, Controller.listarEstadosActividadesProyecto);
router.get('/listar_tipos_actividades_proyecto', auth.auth, Controller.listarTiposActividadesProyecto);
router.get('/listar_direcciones_geo', auth.auth, Controller.listarDireccionesGeo);
router.get('/listar_permisos', auth.auth, Controller.listarPermisos);

module.exports = router;
