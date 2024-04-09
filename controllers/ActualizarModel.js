var mongoose = require('mongoose');

const Model = require('../models/Model');
var bcrypt = require('bcrypt-nodejs');
// Función para actualizar un usuario por su ID
const actualizarUsuario = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        let data = req.body;
        //console.log(id,data,req.files);
        if(req.files.foto){
            var file = req.files.foto;
            var img_path = file.path;
            var name = img_path.split('/'); // usar / en producci�n \\ local
            var portada_name = name[2];
            data.foto=portada_name;
        }
        try {
            if(data.password){
                bcrypt.hash(data.password, null, null, async function (err, hash) {
                    if (hash) {
                        data.password=hash;
                        let usuarioActualizado = await Model.Usuario.findByIdAndUpdate(id, data, { new: true });
                        res.status(200).send({ message: 'Usuario actualizado correctamente', data: usuarioActualizado });
                    }
                });
            }else{
                delete data.password;
                let usuarioActualizado = await Model.Usuario.findByIdAndUpdate(id, data, { new: true });
                res.status(200).send({ message: 'Usuario actualizado correctamente', data: usuarioActualizado });
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al actualizar el usuario', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar una actividad de proyecto por su ID
const actualizarActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let actividadActualizada = await Model.Ficha_sectorial.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Actividad de proyecto actualizada correctamente', data: actividadActualizada });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar la actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar un incidente o denuncia por su ID
const actualizarIncidenteDenuncia = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let incidenteActualizado = await Model.Incidentes_denuncia.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Incidente/denuncia actualizado correctamente', data: incidenteActualizado });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el incidente/denuncia', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar una categoría por su ID
const actualizarCategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let categoriaActualizada = await Model.Categoria.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Categoría actualizada correctamente', data: categoriaActualizada });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar la categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar una subcategoría por su ID
const actualizarSubcategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let subcategoriaActualizada = await Model.Subcategoria.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Subcategoría actualizada correctamente', data: subcategoriaActualizada });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar la subcategoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar un encargado de categoría por su ID
const actualizarEncargadoCategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let encargadoActualizado = await Model.Encargado_categoria.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Encargado de categoría actualizado correctamente', data: encargadoActualizado });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el encargado de categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar un rol de usuario por su ID
const actualizarRolUsuario = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let rolActualizado = await Model.Rol_user.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Rol de usuario actualizado correctamente', data: rolActualizado });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el rol de usuario', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};
const actualizarPermiso = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let permisoActualizado = await Model.Permiso.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Permiso actualizado correctamente', data: permisoActualizado });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el permiso', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar un estado de incidente por su ID
const actualizarEstadoIncidente = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let estadoActualizado = await Model.Estado_incidente.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Estado de incidente actualizado correctamente', data: estadoActualizado });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el estado de incidente', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar un estado de actividad de proyecto por su ID
const actualizarEstadoActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let estadoActualizado = await Model.Estado_actividad_proyecto.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Estado de actividad de proyecto actualizado correctamente', data: estadoActualizado });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el estado de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar un tipo de actividad de proyecto por su ID
const actualizarTipoActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let tipoActualizado = await Model.Actividad_proyecto.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Tipo de actividad de proyecto actualizado correctamente', data: tipoActualizado });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar el tipo de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para actualizar una dirección geográfica por su ID
const actualizarDireccionGeo = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let direccionActualizada = await Model.Direccion_geo.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).send({ message: 'Dirección geográfica actualizada correctamente', data: direccionActualizada });
        } catch (error) {
            res.status(500).send({ message: 'Error al actualizar la dirección geográfica', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

module.exports = {
    actualizarUsuario,
    actualizarActividadProyecto,
    actualizarIncidenteDenuncia,
    actualizarCategoria,
    actualizarSubcategoria,
    actualizarEncargadoCategoria,
    actualizarRolUsuario,
    actualizarEstadoIncidente,
    actualizarEstadoActividadProyecto,
    actualizarTipoActividadProyecto,
    actualizarDireccionGeo,
    actualizarPermiso
};
