const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config({ path: '../' });

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.CONNECT_STRING}/`);
});

// Gets
describe("GET Pacientes de Psicologx", () => {
    it("Debe traer las pacientes del psicologx", async () => {
        const res = await request(app)
            .get("/pacientes/usuario/6371098757ed7900aa3464b6");
        expect(res.statusCode).toBe(200);
        expect(res._body.message).toBe("Pacientes devueltos correctamente");
    });
});

describe("GET Pacientes de Psicologo no existente", () => {
    it("Debe retornar error de usuario no existente", async () => {
        const res = await request(app)
            .get("/pacientes/usuario/6371098757ed7900aas3464b6");
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal Server Error while finding pacientes");
    });
});

describe("GET Pacientes de paciente no existente", () => {
    it("Debe retornar error de usuario no existente", async () => {
        const res = await request(app)
            .get("/pacientes/636f8149d1f41db220755d5d");
        expect(res.statusCode).toBe(200);
        expect(res._body.message).toBe("Paciente 636f8149d1f41db220755d5d devuelto correctamente");
    });
});

describe("GET Pacientes de paciente no existente", () => {
    it("Debe retornar error de usuario no existente", async () => {
        const res = await request(app)
            .get("/pacientes/636f8149d1f41db2ss20755d5d");
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal server error while finding paciente");
    });
});

// // Posts
// describe("POST Crear Paciente", () => {
//     it("Debe crear una paciente correctamente", async () => {
//         const res = await request(app)
//             .post("/pacientes")
//             .send({
//                 DNI: "999999999",
//                 nombre: "Paciente",
//                 apellido: "Test",
                
//             })
//         expect(res.statusCode).toBe(201);
//         expect(res._body.message).toBe("Paciente creado correctamente");
//     });
// });

describe("POST Crear Paciente sin body", () => {
    it("Debe Informar que no se recibio paciente", async () => {
        const res = await request(app)
            .post("/pacientes")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Paciente no recibido");
    });
});

describe("POST Crear Paciente sin Descripcion", () => {
    it("Debe Arrojar error al guardar", async () => {
        const res = await request(app)
            .post("/pacientes")
            .send({
                "Data no Valida": "Test"
            })
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Error while creating paciente");
    });
});

describe("POST Crear Paciente", () => {
    it("Debe crear una paciente correctamente", async () => {
        const res = await request(app)
            .post("/pacientes")
            .send({
                DNI: "999999999",
                nombre: "Paciente",
                apellido: "Test",
                
            })
        expect(res.statusCode).toBe(502);
        expect(res._body.message).toBe("Paciente ya existe");
    });
});
// // Patch
describe("PATCH Editar Paciente", () => {
    it("Debe editar una paciente correctamente", async () => {
        const res = await request(app)
            .patch("/pacientes/6371837ef334350c90e11ea1")
            .send({
                tratamiento_finalizado: true
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Paciente Editado correctamente");
    });
});

describe("PATCH Editar Paciente sin body", () => {
    it("Debe Informar que no se recibio paciente valido", async () => {
        const res = await request(app)
            .patch("/pacientes/6371837ef334350ssc90e11ea1")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Falta Paciente ID");
    });
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});