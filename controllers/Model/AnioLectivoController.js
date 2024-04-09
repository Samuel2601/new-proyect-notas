
var mongoose = require('mongoose');

const Model = require('../../models/Model');

// Función para listar usuarios con opción de búsqueda por filtros
// Función para obtener una lista paginada de usuarios
const listarAnioLectivo = async function (req, res) {
   if (req.user) {
        try {
            const { campo, valor, pagina, porPagina, base } = req.query;
            let filtroConsulta = {};
            let opcionesConsulta = {
                skip: (pagina - 1) * porPagina,
                limit: parseInt(porPagina)
            };

            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }

            let conn = mongoose.connection.useDb(base);
            const Model = conn.model('AnioLectivo');
            const conjunto = await Model.find(filtroConsulta, null, opcionesConsulta).sort({ createdAt: -1 });

            res.status(200).send({ data: conjunto });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la lista de jornadas', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};

// Función para obtener la cantidad total de usuarios
const contarAnioLectivo = async function (req, res) {
   if (req.user) {
        try {
            const { campo, valor, base } = req.query;
            let filtroConsulta = {};

            if (campo && valor) {
                filtroConsulta[campo] = valor;
            }

            let conn = mongoose.connection.useDb(base);
            const Model = conn.model('AnioLectivo');
            const totalconjunto = await Model.countDocuments(filtroConsulta);

            res.status(200).send({ total: totalconjunto });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener el total de jornadas', error: error });
        }
    } else {
        res.status(500).send({ message: 'No se ha proporcionado un usuario válido' });
    }
};


module.exports = {
    listarUsuarios,
    contarUsuarios
};
