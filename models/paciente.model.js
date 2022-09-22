const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PacienteSchema = Schema({
    nombre: String,
    apellido: String,
    fecha_nacimiento: Date,
    fecha_inicio_tramite: { type: Date, default: Date.now },
    DNI: Number,
    email: String,
    telelefono_personal: String,
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
    // courses: [{type: Schema.Types.ObjectId, ref: 'course'}]
});

module.exports = mongoose.model("pacientes", PacienteSchema);