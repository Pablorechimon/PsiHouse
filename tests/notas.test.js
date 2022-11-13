const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config({ path: '../' });

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.CONNECT_STRING}/`);
});

// Gets
describe("GET Notas de Paciente", () => {
    it("Debe traer las notas del psicologx", async () => {
        const res = await request(app)
            .get("/pacientes/631fb73590ac706288335071/notas");
        expect(res.statusCode).toBe(200);
        expect(res._body.message).toBe("Notas devueltas correctamente");
    });
});

describe("GET Notas de paciente no existente", () => {
    it("Debe retornar error de usuario no existente", async () => {
        const res = await request(app)
            .get("/pacientes/631fb73590acs706288335071/notas");
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal Server Error while finding notas");
    });
});

// Posts
describe("POST Crear Nota", () => {
    it("Debe crear una nota correctamente", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/notas")
            .send({
                nota: "Esta es la nota del paciente Test"
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Nota creada correctamente");
    });
});

describe("POST Crear Nota sin body", () => {
    it("Debe Informar que no se recibio nota", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/notas")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Nota no recibida");
    });
});

describe("POST Crear Nota sin Descripcion", () => {
    it("Debe Arrojar error al guardar", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/notas")
            .send({
                "Data no Valida": "Test"
            })
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal server error while saving");
    });
});

// Patch
describe("PATCH Editar Nota", () => {
    it("Debe editar una nota correctamente", async () => {
        const res = await request(app)
            .patch("/pacientes/631fb73590ac706288335071/notas")
            .send({
                _id: '637178d4897d0bfd3d93bf81',
                nota: "Nota Editada de Test"
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Nota Editada correctamente");
    });
});

describe("PATCH Editar Nota sin body", () => {
    it("Debe Informar que no se recibio nota", async () => {
        const res = await request(app)
            .patch("/pacientes/631fb73590ac706288335071/notas")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Falta Nota ID");
    });
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});