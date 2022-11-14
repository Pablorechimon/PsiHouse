const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config({ path: '../' });

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.CONNECT_STRING}/`);
});

// Gets
describe("GET Compartidos de Paciente", () => {
    it("Debe traer las compartidos del psicologx", async () => {
        const res = await request(app)
            .get("/pacientes/631fb73590ac706288335071/compartidos");
        expect(res.statusCode).toBe(200);
        expect(res._body.message).toBe("Compartidos devueltos correctamente");
    });
});

describe("GET Compartidos de paciente no existente", () => {
    it("Debe retornar error de usuario no existente", async () => {
        const res = await request(app)
            .get("/pacientes/631fb73590acs706288335071/compartidos");
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal Server Error while finding compartidos");
    });
});

// Posts
describe("POST Crear Compartido", () => {
    it("Debe crear una compartido correctamente", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/compartidos")
            .send({
                recurso: {
                    nombre: 'Recurso Test',
                    formato: 'Formato Test'
                }
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Compartido creado correctamente");
    });
});

describe("POST Crear Compartido sin body", () => {
    it("Debe Informar que no se recibio compartido", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/compartidos")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Compartido no recibido");
    });
});

describe("POST Crear Compartido sin Descripcion", () => {
    it("Debe Arrojar error al guardar", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/compartidos")
            .send({
                "Data no Valida": "Test"
            })
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal server error while saving");
    });
});

// Patch
describe("PATCH Editar Compartido", () => {
    it("Debe editar una compartido correctamente", async () => {
        const res = await request(app)
            .patch("/pacientes/631fb73590ac706288335071/compartidos")
            .send({
                _id: '63717eba1ebc15f076948866',
                recurso: {
                    nombre: 'Recurso Editado de Test',
                    formato: 'Formato Editado de Test'
                }
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Compartido Editado correctamente");
    });
});

describe("PATCH Editar Compartido sin body", () => {
    it("Debe Informar que no se recibio compartido", async () => {
        const res = await request(app)
            .patch("/pacientes/631fb73590ac706288335071/compartidos")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Falta Compartido ID");
    });
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});