const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PacienteSchema = Schema({
    id_usuario: {type: Schema.Types.ObjectId, ref: 'usuarios'},
    DNI: String,
    nombre: String,
    apellido: String,
    fecha_nacimiento: Date,
    fecha_inicio_tramite: { type: Date, default: Date.now },
    email: String,
    telefono_personal: String,
    telefono_tercero: String,
    localidad: String,
    personas_convivientes: String,
    situacion_laboral: String,
    derivante: String,
    motivo_de_consulta: String,
    valor_consulta: Number,
    antecedentes_psiquiatricos_personales: String,
    antecedentes_psiquiatricos_familiares: String,
    tratamiento_en_curso: String,
    medicacion_actual: String,
    riesgo_suicida: Boolean,
    tratamiento_previo: String,
    consumo_sustancias: String,
    tratamiento_finalizado: Boolean
});

module.exports = mongoose.model("pacientes", PacienteSchema);