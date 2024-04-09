'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definición del esquema para el modelo de Jornada
const JornadaSchema = new Schema({
    nombre: { type: String, required: true },
    cursos: [{ type: Schema.Types.ObjectId, ref: 'Curso' }]
});

const TipoSchema = new Schema({
    nombre: { type: String, required: true },
    cursos: [{ type: Schema.Types.ObjectId, ref: 'Curso' }]
});
// Definición del esquema para el modelo de Curso
const CursoSchema = new Schema({
    nombre: { type: Number, required: true },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
    jornada: { type: Schema.Types.ObjectId, ref: 'Jornada', required: true },
    paralelos: [{ type: Schema.Types.ObjectId, ref: 'Paralelo' }],
    docenteSupervisor: { type: Schema.Types.ObjectId, ref: 'Docente' }
});

// Definición del esquema para el modelo de Paralelo
const ParaleloSchema = new Schema({
    nombre: { type: String, required: true },
    curso: { type: Schema.Types.ObjectId, ref: 'Curso', required: true },
    materias: [{ type: Schema.Types.ObjectId, ref: 'Materia' }],
    docenteSupervisor: { type: Schema.Types.ObjectId, ref: 'Docente' }
});

// Definición del esquema para el modelo de Materia
const MateriaSchema = new Schema({
    nombre: { type: String, required: true },
    docente: { type: Schema.Types.ObjectId, ref: 'Docente', required: true },
    estudiantes: [{ type: Schema.Types.ObjectId, ref: 'Estudiante' }],
    actividades: [{
        periodo: { type: Number, required: true },
        subperiodo: { type: Number, required: true },
        nombre: { type: String, required: true },
        ponderacion: { type: Number, required: true },
        progresoEstudiantes: [{
            estudiante: { type: Schema.Types.ObjectId, ref: 'Estudiante', required: true },
            progreso: { type: Number, required: true }
        }]
    }]
});

// Definición del esquema para el modelo de Docente
const DocenteSchema = new Schema({
    nombre: { type: String, required: true },
    cursosAsignados: [{ type: Schema.Types.ObjectId, ref: 'Curso' }],
    materiasImpartidas: [{ type: Schema.Types.ObjectId, ref: 'Materia' }],
    foto: { type: String },
});

// Definición del esquema para el modelo de AnioLectivo
const AnioLectivoSchema = new Schema({
    año: { type: Number, required: true },
    periodos: [{
        numero: { type: Number, required: true },
        subperiodos: [{
            numero: { type: Number, required: true },
            fechaInicio: { type: Date, required: true },
            fechaFin: { type: Date, required: true }
        }]
    }]
});

// Definición del esquema para el modelo de Estudiante
const EstudianteSchema = new Schema({
    nombre: { type: String, required: true },
    cursos: [{
        curso: { type: Schema.Types.ObjectId, ref: 'Curso', required: true },
        paralelo: { type: Schema.Types.ObjectId, ref: 'Paralelo', required: true },
        materias: [{
            materia: { type: Schema.Types.ObjectId, ref: 'Materia', required: true },
            notas: [{
                actividad: { type: Schema.Types.ObjectId, ref: 'Materia.actividades', required: true },
                valor: { type: Number, required: true }
            }]
        }]
    }]
});

//Definición del esuqme para el modelo de Administración
const UsuarioSchema = new Schema({
    cedula: { type: String, required: true, unique: true },
    nombres: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    foto: { type: String },
    estado: { type: String, default: 'On' },
    createdAt: {type:Date, default: Date.now, require: true}
});

// Definición del esquema para el modelo de BaseDatos
const BaseDatosSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    usuario: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    createdAt: {type:Date, default: Date.now, require: true}
});

// Exportar el esquema como modelo
const BaseDatos = mongoose.model('BaseDatos', BaseDatosSchema);


// Exportar los esquemas como modelos
const User = mongoose.model('User',UsuarioSchema);
const Jornada = mongoose.model('Jornada', JornadaSchema);
const Tipo = mongoose.model('Tipo', TipoSchema);
const Curso = mongoose.model('Curso', CursoSchema);
const Paralelo = mongoose.model('Paralelo', ParaleloSchema);
const Materia = mongoose.model('Materia', MateriaSchema);
const Docente = mongoose.model('Docente', DocenteSchema);
const AnioLectivo = mongoose.model('AnioLectivo', AnioLectivoSchema);
const Estudiante = mongoose.model('Estudiante', EstudianteSchema);

module.exports = { User, BaseDatos, Jornada, Tipo, Curso, Paralelo, Materia, Docente, AnioLectivo, Estudiante };
