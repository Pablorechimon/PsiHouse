const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config({ path: '../' });

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.CONNECT_STRING}/`);
});

// Gets
describe("GET Historias de Paciente", () => {
    it("Debe traer las historias del psicologx", async () => {
        const res = await request(app)
            .get("/pacientes/631fb73590ac706288335071/historias");
        expect(res.statusCode).toBe(200);
        expect(res._body.message).toBe("Historias devueltas correctamente");
    });
});

describe("GET Historias de paciente no existente", () => {
    it("Debe retornar error de usuario no existente", async () => {
        const res = await request(app)
            .get("/pacientes/631fb73590acs706288335071/historias");
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal Server Error while finding historias");
    });
});

// Posts
describe("POST Crear Historia", () => {
    it("Debe crear una historia correctamente", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/historias")
            .send({
                historia: "Esta es la historia del paciente Test"
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Historia creada correctamente");
    });
});

describe("POST Crear Historia sin body", () => {
    it("Debe Informar que no se recibio historia", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/historias")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Historia no recibida");
    });
});

describe("POST Crear Historia sin Descripcion", () => {
    it("Debe Arrojar error al guardar", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/historias")
            .send({
                "Data no Valida": "Test"
            })
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal server error while saving");
    });
});

// Patch
describe("PATCH Editar Historia", () => {
    it("Debe editar una historia correctamente", async () => {
        const res = await request(app)
            .patch("/pacientes/631fb73590ac706288335071/historias")
            .send({
                _id: '63717b73456402b973f77a81',
                historia: "Historia Editada de Test"
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Historia Editada correctamente");
    });
});

describe("PATCH Editar Historia sin body", () => {
    it("Debe Informar que no se recibio historia", async () => {
        const res = await request(app)
            .patch("/pacientes/631fb73590ac706288335071/historias")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Falta Historia ID");
    });
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});