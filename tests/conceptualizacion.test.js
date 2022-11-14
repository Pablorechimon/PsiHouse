const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config({ path: '../' });

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.CONNECT_STRING}/`);
});

// Gets
describe("GET Conceptualizaciones de Paciente", () => {
    it("Debe traer las conceptualizaciones del psicologx", async () => {
        const res = await request(app)
            .get("/pacientes/631fb73590ac706288335071/conceptualizaciones");
        expect(res.statusCode).toBe(200);
        expect(res._body.message).toBe("Conceptualizaciones devueltas correctamente");
    });
});

describe("GET Conceptualizaciones de paciente no existente", () => {
    it("Debe retornar error de paciente no existente", async () => {
        const res = await request(app)
            .get("/pacientes/631fb73590acs706288335071/conceptualizaciones");
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal Server Error while finding conceptualizaciones");
    });
});

// Posts
describe("POST Crear Conceptualizacion", () => {
    it("Debe crear una conceptualizacion correctamente", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/conceptualizaciones")
            .send({
                conceptualizacion: "Esta es la conceptualizacione del paciente Test"
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Conceptualizacion creada correctamente");
    });
});

describe("POST Crear Conceptualizacion sin body", () => {
    it("Debe Informar que no se recibio conceptualizacion", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/conceptualizaciones")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Conceptualizacion no recibida");
    });
});

describe("POST Crear Conceptualizacion sin Descripcion", () => {
    it("Debe Arrojar error al guardar", async () => {
        const res = await request(app)
            .post("/pacientes/631fb73590ac706288335071/conceptualizaciones")
            .send({
                "Data no Valida": "Test"
            })
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Internal server error while saving");
    });
});

// Patch
describe("PATCH Editar Conceptualizacion", () => {
    it("Debe editar una conceptualizacion correctamente", async () => {
        const res = await request(app)
            .patch("/pacientes/631fb73590ac706288335071/conceptualizaciones")
            .send({
                _id: '63717da03d9538c620b71286',
                conceptualizacione: "Conceptualizacion Editada de Test"
            })
        expect(res.statusCode).toBe(201);
        expect(res._body.message).toBe("Conceptualizacion Editada correctamente");
    });
});

describe("PATCH Editar Conceptualizacione sin body", () => {
    it("Debe Informar que no se recibio conceptualizacione", async () => {
        const res = await request(app)
            .patch("/pacientes/631fb73590ac706288335071/conceptualizaciones")
        expect(res.statusCode).toBe(501);
        expect(res._body.message).toBe("Falta Conceptualizacion ID");
    });
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});