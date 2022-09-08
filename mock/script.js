const Paciente = require('../models/paciente.model')
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://admin:EO2OYCOtpDynsDFv@psihouse-cluster.ex7xfxd.mongodb.net/`).then(() => {
    console.log("OK - Success to connect to DB");
    //Mocking Paciente
    const pablo = new Paciente({
        nombre: "Pablo",
        apellido: "Rechimon",
        fecha_nacimiento: new Date(1991, 9, 15),
        DNI: 36159484,
        email: "pablo.h.rechimon",
        telelefono_personal: "15-64290921",
        telefono_tercero: "15-12341234",
        localidad: "Ituzaingo",
        personas_convivientes: "Pareja",
        situacion_laboral: "Indigena",
        derivante: "Macarena",
        motivo_de_consulta: "Miedo al exito",
        valor_consulta: 5000,
        estado_deuda: false,
        valor_deuda: 0,
        antecedentes_psiquiatricos_personales: "Ninguno gracias a dios",
        antecedentes_psiquiatricos_familiares: "Ninguno gracias a jesus",
        tratamiento_en_curso: "Curso AWS Devops",
        medicacion_actual: "Faso",
        riesgo_suicida: false,
        tratamiento_previo: "Ninguno",
        consumo_sustancias: "Todas",
        tratamiento_finalizado: false
      });
      pablo.save()

      //Compartido
})
.catch(err => console.log("ERR - Error to connect to DB: ",err));

