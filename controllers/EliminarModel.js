var mongoose = require('mongoose');

const Model = require('../models/Model');

// Función para eliminar un usuario por su ID
const eliminarUsuario = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Usuario.findByIdAndDelete(id);
            res.status(200).send({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el usuario', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar una actividad de proyecto por su ID
const eliminarActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Ficha_sectorial.findByIdAndDelete(id);
            res.status(200).send({ message: 'Actividad de proyecto eliminada correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar la actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar un incidente o denuncia por su ID
const eliminarIncidenteDenuncia = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Incidentes_denuncia.findByIdAndDelete(id);
            res.status(200).send({ message: 'Incidente/denuncia eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el incidente/denuncia', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};
const verificarCategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            const cantidadSubcategorias = await Model.Subcategoria.countDocuments({ categoria: id });            
            const cantidadIncidentes = await Model.Incidentes_denuncia.countDocuments({ categoria: id });

            res.status(200).send({
                cantidadSubcategorias: cantidadSubcategorias,
                cantidadIncidentes: cantidadIncidentes
            });
        } catch (error) {
            res.status(500).send({ message: 'Error al verificar la categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar una categoría por su ID
const eliminarCategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            // Verificar si se debe eliminar subcategorías e incidentes
            const { eliminarSubcategorias, nuevaCategoria } = req.body;
            
            if (eliminarSubcategorias) {
                // Eliminar subcategorías
                await Model.Subcategoria.deleteMany({ categoria: id });
                
                // Eliminar incidentes
                await Model.Incidentes_denuncia.deleteMany({ categoria: id });
            } else if (nuevaCategoria) {
                // Vincular subcategorías e incidentes a la nueva categoría
                await Model.Subcategoria.updateMany({ categoria: id }, { categoria: nuevaCategoria });
                await Model.Incidentes_denuncia.updateMany({ categoria: id }, { categoria: nuevaCategoria });
            }
            
            // Eliminar la categoría
            await Model.Categoria.findByIdAndDelete(id);
            
            res.status(200).send({ message: 'Categoría eliminada correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar la categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};


// Función para eliminar una subcategoría por su ID
const eliminarSubcategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            // Verificar si se debe eliminar subcategorías e incidentes
            const { eliminarSubcategorias, nuevaCategoria } = req.body;
            if (eliminarSubcategorias) {                
                // Eliminar incidentes
                await Model.Incidentes_denuncia.deleteMany({ categoria: id });
            } else if (nuevaCategoria) {
                // Vincular subcategorías e incidentes a la nueva categoría
                await Model.Incidentes_denuncia.updateMany({ categoria: id }, { categoria: nuevaCategoria });
            }

            await Model.Subcategoria.findByIdAndDelete(id);
            res.status(200).send({ message: 'Subcategoría eliminada correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar la subcategoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

const verificarSubCategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {

            const cantidadIncidentes = await Model.Incidentes_denuncia.countDocuments({ subcategoria: id });

            res.status(200).send({
                cantidadIncidentes: cantidadIncidentes
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ message: 'Error al verificar la categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar un encargado de categoría por su ID
const eliminarEncargadoCategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Encargado_categoria.findByIdAndDelete(id);
            res.status(200).send({ message: 'Encargado de categoría eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el encargado de categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar un rol de usuario por su ID
const eliminarRolUsuario = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Rol_user.findByIdAndDelete(id);
            res.status(200).send({ message: 'Rol de usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el rol de usuario', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

const eliminarPermiso = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Permiso.findByIdAndDelete(id);
            res.status(200).send({ message: 'Permiso eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el permiso', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar un estado de incidente por su ID
const eliminarEstadoIncidente = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Estado_incidente.findByIdAndDelete(id);
            res.status(200).send({ message: 'Estado de incidente eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el estado de incidente', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar un estado de actividad de proyecto por su ID
const eliminarEstadoActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Estado_actividad_proyecto.findByIdAndDelete(id);
            res.status(200).send({ message: 'Estado de actividad de proyecto eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el estado de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar un tipo de actividad de proyecto por su ID
const eliminarTipoActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Actividad_proyecto.findByIdAndDelete(id);
            res.status(200).send({ message: 'Tipo de actividad de proyecto eliminado correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar el tipo de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para eliminar una dirección geográfica por su ID
const eliminarDireccionGeo = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            await Model.Direccion_geo.findByIdAndDelete(id);
            res.status(200).send({ message: 'Dirección geográfica eliminada correctamente' });
        } catch (error) {
            res.status(500).send({ message: 'Error al eliminar la dirección geográfica', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

module.exports = {
    eliminarUsuario,
    eliminarActividadProyecto,
    eliminarIncidenteDenuncia,
    eliminarCategoria,
    eliminarSubcategoria,
    eliminarEncargadoCategoria,
    eliminarRolUsuario,
    eliminarEstadoIncidente,
    eliminarEstadoActividadProyecto,
    eliminarTipoActividadProyecto,
    eliminarDireccionGeo,
    eliminarPermiso,
    verificarCategoria,
    verificarSubCategoria
};
