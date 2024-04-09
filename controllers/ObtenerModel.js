var mongoose = require('mongoose');

const Model = require('../models/Model');

// Función para obtener un usuario por su ID
const obtenerUsuario = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let usuario = await Model.Usuario.findById({ _id: id }).populate('rol_user');
            res.status(200).send({ data: usuario });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el usuario', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener una actividad de proyecto por su ID
const obtenerActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let actividad = await Model.Ficha_sectorial.findById({ _id: id });
            res.status(200).send({ data: actividad });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener un incidente o denuncia por su ID
const obtenerIncidenteDenuncia = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let incidente = await Model.Incidentes_denuncia.findById({ _id: id });
            res.status(200).send({ data: incidente });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el incidente/denuncia', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener una categoría por su ID
const obtenerCategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let categoria = await Model.Categoria.findById({ _id: id });
            res.status(200).send({ data: categoria });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener una subcategoría por su ID
const obtenerSubcategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let subcategoria = await Model.Subcategoria.findById({ _id: id }).populate('categoria');
            res.status(200).send({ data: subcategoria });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la subcategoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener un encargado de categoría por su ID
const obtenerEncargadoCategoria = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let encargado = await Model.Encargado_categoria.findById({ _id: id });
            res.status(200).send({ data: encargado });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el encargado de categoría', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener un rol de usuario por su ID
const obtenerRolUsuario = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let rol = await Model.Rol_user.findById({ _id: id });
            res.status(200).send({ data: rol });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el rol de usuario', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener un estado de incidente por su ID
const obtenerEstadoIncidente = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let estado = await Model.Estado_incidente.findById({ _id: id });
            res.status(200).send({ data: estado });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el estado de incidente', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener un estado de actividad de proyecto por su ID
const obtenerEstadoActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let estado = await Model.Estado_actividad_proyecto.findById({ _id: id });
            res.status(200).send({ data: estado });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el estado de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener un tipo de actividad de proyecto por su ID
const obtenerTipoActividadProyecto = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let tipo = await Model.Actividad_proyecto.findById({ _id: id });
            res.status(200).send({ data: tipo });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el tipo de actividad de proyecto', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};

// Función para obtener una dirección geográfica por su ID
const obtenerDireccionGeo = async function (req, res) {
    if (req.user) {
        var id = req.params['id'];
        try {
            let direccion = await Model.Direccion_geo.findById({ _id: id });
            res.status(200).send({ data: direccion });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la dirección geográfica', error: error });
        }
    } else {
        res.status(500).send({ message: 'Acceso no permitido' });
    }
};
// Función para obtener una dirección geográfica por su ID
const verificarPermiso = async function (req, res) {
    if (req.user) {
        try {
            // Obtener los parámetros desde la solicitud
            const { componente, rol_usuario } = req.body;

            const permisoComponente =await Model.Permiso.findOne({ nombreComponente: componente});
            if(permisoComponente){
                // Verificar si el usuario tiene permiso para acceder al recurso
                const permiso=permisoComponente .rolesPermitidos.includes(rol_usuario);

                if (permiso) {
                    // Si el permiso existe, enviarlo en la respuesta
                    res.status(200).send({ data: permisoComponente  });
                } else {
                    // Si el permiso no existe, enviar un mensaje de error
                    res.status(404).send({ message: 'Permiso no encontrado' });
                }
            }else{
                // Si el permiso existe, enviarlo en la respuesta
                res.status(200).send({ data: permisoComponente });
            }
            
        } catch (error) {
            // Si ocurre un error al buscar el permiso, enviar un mensaje de error
            res.status(500).send({ message: 'Error al obtener la dirección geográfica', error: error });
        }
    } else {
        // Si el usuario no está autenticado, enviar un mensaje de acceso no permitido
        res.status(401).send({ message: 'Acceso no permitido' });
    }
};

// Función para listar direcciones geográficas con opción de búsqueda por filtros
const obtenerPermisosRol = async function (req, res) {
    if (req.user) {
        try {
            // Obtener los parámetros desde la solicitud
            const rol_usuario = req.params['id'];

            const permisoComponente =await Model.Permiso.find({ rolesPermitidos: rol_usuario});
            const permisos = {};
            permisoComponente.forEach((item) => {
            permisos[item.nombreComponente] = true;
            });
            res.status(200).send({ data: permisos  });
            
        } catch (error) {
            console.error(error);
            // Si ocurre un error al buscar el permiso, enviar un mensaje de error
            res.status(500).send({ message: 'Error al obtener la dirección geográfica', error: error });
        }
    } else {
        // Si el usuario no está autenticado, enviar un mensaje de acceso no permitido
        res.status(401).send({ message: 'Acceso no permitido' });
    }
};

module.exports = {
    obtenerUsuario,
    obtenerActividadProyecto,
    obtenerIncidenteDenuncia,
    obtenerCategoria,
    obtenerSubcategoria,
    obtenerEncargadoCategoria,
    obtenerRolUsuario,
    obtenerEstadoIncidente,
    obtenerEstadoActividadProyecto,
    obtenerTipoActividadProyecto,
    obtenerDireccionGeo,
    verificarPermiso,
    obtenerPermisosRol
};
