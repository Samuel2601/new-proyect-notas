const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticate'); // Importar middleware de autenticación
const Controller = require('../controllers/RegistroModel'); // Importar controlador
var multiparty = require('connect-multiparty');
var path = new multiparty({
  uploadDir: './uploads/incidentes/',
  maxFieldsSize: 50 * 1024 * 1024});

// Rutas para registrar elementos en diferentes modelos
router.post('/registrar_incidente_denuncia',[auth.auth,path], Controller.registrarIncidenteDenuncia);
router.post('/registrar_usuario', Controller.registrarUsuario);
var path2 = new multiparty({
  uploadDir: './uploads/fichas/',
  maxFieldsSize: 50 * 1024 * 1024});

router.post('/registrar_actividad_proyecto', [auth.auth,path2], Controller.registrarActividadProyecto);
router.post('/registrar_categoria', auth.auth, Controller.registrarCategoria);
router.post('/registrar_subcategoria', auth.auth, Controller.registrarSubcategoria);
router.post('/registrar_encargado_categoria', auth.auth, Controller.registrarEncargadoCategoria);
router.post('/registrar_rol_usuario', auth.auth, Controller.registrarRolUsuario);
router.post('/registrar_estado_incidente', auth.auth, Controller.registrarEstadoIncidente);
router.post('/registrar_estado_actividad_proyecto', auth.auth, Controller.registrarEstadoActividadProyecto);
router.post('/registrar_tipo_actividad_proyecto', auth.auth, Controller.registrarTipoActividadProyecto);
var path3 = new multiparty({
  uploadDir: './uploads/barrios/',
  maxFieldsSize: 50 * 1024 * 1024});

router.post('/registrar_direccion_geo', [auth.auth,path3], Controller.registrarDireccionGeo);
router.post('/registrar_permisos', auth.auth, Controller.registrarPermiso);

/*const multer = require('multer');

// Configuración de multer para guardar archivos en una carpeta local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Nombre original del archivo
    }
  });
const upload = multer({ storage: storage });

router.post('/registrar_incidente_app', [auth.auth,path],Controller.registrarIncidenteDenuncia);
*/

module.exports = router;