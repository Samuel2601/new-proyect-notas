var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const Model = require('../models/Model');
var fs = require('fs');
// Función para registrar un nuevo usuario
const registrarUsuario = async function (req, res) {
    try {
        console.log(req.body);
            var data = req.body;
            
            if(!data.rol_user){
                let rol_arr = await Model.Rol_user.find({ orden: { $gt: 3 } }).sort({orden:-1});
                if(!rol_arr){
                    let rol_arrc = await Model.Rol_user.create({nombre:'Ciudadano', orden: 4});
                    data.rol_user = rol_arrc._id;
                }else{
                    //console.log(rol_arr);
                    data.rol_user = rol_arr[0]._id;
                }
            }
            var admin = await Model.Usuario.findOne({ $or: [{ correo: data.correo }, { cedula: data.cedula }] });

            if(!admin){
                try {
                    bcrypt.hash(data.password, null, null, async function (err, hash) {
                        if (hash) {
                            data.password = hash;
                            data.estado = 'On';
                            //console.log(data);
                            await Model.Usuario.create(data);
                            res.status(201).send({ message: 'Registrado con éxito' });
                        } else {
                            res.status(500).send({ message: 'ErrorServer' });
                        }
                    });
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ message: 'Algo salió mal' });
                }
            }else{
                res.status(409).send({ message: 'El correo y/o la cédula ya existe en la base de datos' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Algo salió mal' });
        }
};


// Función para registrar una nueva actividad de proyecto
const registrarActividadProyecto = async function (req, res) {
    if (req.user) {
        try {
            let data = req.body;
            var fotos = [];
            var index = 0;
            while (req.files['foto' + index]) {
                var file = req.files['foto' + index];
                var img_path = file.path;
                var name = img_path.split('/'); // usar / en producci�n \\ local
                var portada_name = name[2];
                fotos.push(portada_name);
                index++;
            }
            if (fotos.length > 0) {
                data.foto = fotos;
            }
            let nuevaActividad = await Model.Ficha_sectorial.create(data);
            res.status(200).send({ message: 'Actividad de proyecto registrada correctamente', data: nuevaActividad });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar la actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo incidente o denuncia
const registrarIncidenteDenuncia = async function (req, res) {
    if (req.user) {
        try {
            //console.log("Body", req.body);
            var fotos = [];
            var index = 0;
            while (req.files['foto' + index]) {
                var file = req.files['foto' + index];
                var img_path = file.path;
                var name = img_path.split('/'); // usar / en producci�n \\ local
                var portada_name = name[2];
                fotos.push(portada_name);
                index++;
            }
            if (fotos.length > 0) {
                req.body.foto = fotos;
            }
            let estado = await Model.Estado_incidente.findOne().sort({ orden: 1 });
            if (estado) {
                req.body.estado = estado._id;
                req.body.direccion_geo=JSON.parse(req.body.direccion_geo);
                let nuevoIncidente = await Model.Incidentes_denuncia.create(req.body);
                res.status(200).send({ message: 'Incidente/denuncia registrado correctamente', data: nuevoIncidente });
            } else {
                res.status(500).send({ message: 'Error al registrar el incidente/denuncia', error: 'No se han registrado Estado de Incidencia' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al registrar el incidente/denuncia', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};


// Función para registrar una nueva categoría
const registrarCategoria = async function (req, res) {
    if (req.user) {
        try {
            let data=req.body;
            let find = await Model.Categoria.find({nombre:data.nombre});
            if(find.length==0){
                let nuevaCategoria = await Model.Categoria.create(req.body);
                res.status(200).send({ message: 'Categoría registrada correctamente', data: nuevaCategoria });
            }else{
                res.status(500).send({ message: 'Ya registró la categoría', data: undefined  }); 
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar la categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar una nueva subcategoría
const registrarSubcategoria = async function (req, res) {
    if (req.user) {
        try {
            let data=req.body;
            let find = await Model.Subcategoria.find({nombre:data.nombre});
            if(find.length==0){
                let nuevaSubcategoria = await Model.Subcategoria.create(req.body);
                res.status(200).send({ message: 'Subcategoría registrada correctamente', data: nuevaSubcategoria });
            }else{
                res.status(500).send({ message: 'Ya registró la subcategoría', data: undefined  }); 
            }            
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar la subcategoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo encargado de categoría
const registrarEncargadoCategoria = async function (req, res) {
    if (req.user) {
        try {
            let data = req.body;
            let encargadoCategoriaExistente = await Model.Encargado_categoria.findOne({categoria: data.categoria });
            if (encargadoCategoriaExistente) {
                // Si ya existe, actualizar el encargado de categoría existente
                encargadoCategoriaExistente.encargado = data.encargado;
                encargadoCategoriaExistente.categoria = data.categoria;
                await encargadoCategoriaExistente.save();
                res.status(200).send({ message: 'Encargado de categoría actualizado correctamente', data: encargadoCategoriaExistente });
            } else {
                // Si no existe, crear un nuevo encargado de categoría
                let nuevoEncargado = await Model.Encargado_categoria.create(data);
                res.status(200).send({ message: 'Encargado de categoría registrado correctamente', data: nuevoEncargado });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar o actualizar el encargado de categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};


// Función para registrar un nuevo rol de usuario
const registrarRolUsuario = async function (req, res) {
    if (req.user) {
        try {
            // Verificar si ya existe un rol de usuario con el mismo orden
            const rolExistente = await Model.Rol_user.findOne({ orden: req.body.orden });
            if (rolExistente) {
                return res.status(400).send({ message: 'Ya existe un rol de usuario con el mismo orden' });
            }

            // Crear el nuevo rol de usuario
            let nuevoRol = await Model.Rol_user.create(req.body);
            res.status(200).send({ message: 'Rol de usuario registrado correctamente', data: nuevoRol });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el rol de usuario', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

const registrarPermiso = async function (req, res) {
    if (req.user) {
        try {
            let data = req.body;
            let permisoExistente = await Model.Permiso.findOne({ nombreComponente: data.nombreComponente });
             if (permisoExistente) {
                // Si ya existe, actualizar el encargado de categoría existente
                permisoExistente.nombreComponente = data.nombreComponente;
                permisoExistente.rolesPermitidos = data.rolesPermitidos;
                await permisoExistente.save();
                res.status(200).send({ message: 'Permiso actualizado correctamente', data: permisoExistente });
            } else {
                // Si no existe, crear un nuevo encargado de categoría
                let nuevoPermiso = await Model.Permiso.create(data);
                res.status(200).send({ message: 'Permiso registrado correctamente', data: nuevoPermiso });
            }
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el permiso', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo estado de incidente
const registrarEstadoIncidente = async function (req, res) {
    if (req.user) {
        try {
            let data = req.body;
            let verf= await Model.Estado_incidente.find();
            if(verf.length==0){
                data.orden=1;
            }
            let nuevoEstado = await Model.Estado_incidente.create(data);
            res.status(200).send({ message: 'Estado de incidente registrado correctamente', data: nuevoEstado });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el estado de incidente', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo estado de actividad de proyecto
const registrarEstadoActividadProyecto = async function (req, res) {
    if (req.user) {
        try {
            let data = req.body;
            let verf= await Model.Estado_actividad_proyecto.find();
            if(!verf){
                data.orden=1;
            }
            let nuevoEstado = await Model.Estado_actividad_proyecto.create(data);
            res.status(200).send({ message: 'Estado de actividad de proyecto registrado correctamente', data: nuevoEstado });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el estado de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar un nuevo tipo de actividad de proyecto
const registrarTipoActividadProyecto = async function (req, res) {
    if (req.user) {
        try {
            let nuevoTipo = await Model.Actividad_proyecto.create(req.body);
            res.status(200).send({ message: 'Tipo de actividad de proyecto registrado correctamente', data: nuevoTipo });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar el tipo de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para registrar una nueva dirección geográfica
const registrarDireccionGeo = async function (req, res) {
    if (req.user) {
        let data = req.body;
        if(req.files.foto){
            var file = req.files.foto;
            var img_path = file.path;

            /*
            var name = img_path.split('/'); // usar / en producción \\ local
            var portada_name = name[2];
            */
            // Obtener la extensión del archivo
            var ext = file.originalFilename.split('.').pop();
            // Generar un nuevo nombre único para el archivo
            var newFileName = data.nombre + '.' + ext;
            // Ruta donde se guardará el archivo con el nuevo nombre
            var newPath = './uploads/barrios/' + newFileName;
            // Eliminar cualquier imagen con el mismo nombre que data.nombre
            fs.readdirSync('./uploads/barrios/').forEach(file => {
                if (file.startsWith(data.nombre)) {
                    fs.unlinkSync('./uploads/barrios/' + file);
                }
            });
            // Renombrar el archivo
            fs.renameSync(img_path, newPath);
            
            // Guardar el nuevo nombre en los datos
            data.foto = newFileName;
            res.status(200).send({ message: 'Guardado', data: data.nombre });
        }else{
            res.status(400).send({ message: 'No se ha enviando una imagen' });
        }
        /*
        try {
            let nuevaDireccion = await Model.Direccion_geo.create(req.body);
            res.status(200).send({ message: 'Dirección geográfica registrada correctamente', data: nuevaDireccion });
        } catch (error) {
            res.status(500).send({ message: 'Error al registrar la dirección geográfica', error: error });
        }*/
    } else {
        res.status(401).send({ message: 'Acceso no permitido' });
    }
};

module.exports = {
    registrarUsuario,
    registrarActividadProyecto,
    registrarIncidenteDenuncia,
    registrarCategoria,
    registrarSubcategoria,
    registrarEncargadoCategoria,
    registrarRolUsuario,
    registrarEstadoIncidente,
    registrarEstadoActividadProyecto,
    registrarTipoActividadProyecto,
    registrarDireccionGeo,
    registrarPermiso
};
