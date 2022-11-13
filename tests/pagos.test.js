const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config({path: '../'});

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.CONNECT_STRING}/`);
  });
  
  // Gets
describe("GET Deudores Psicologx", () => {
  it("Debe traer listado de deudores con sus deudas", async () => {
    const res = await request(app).get("/pagos/usuario/63224baa1aff060bdd51f792");
    expect(res.statusCode).toBe(200);
    expect(res._body.message).toBe("Pagos devueltos correctamente");
  });
});

describe("GET Pagos de paciente", () => {
    it("Debe traer listado de pagos de X paciente", async () => {
      const res = await request(app).get("/pacientes/631fb73590ac706288335071/pagos");
      expect(res.statusCode).toBe(200);
      expect(res._body.message).toBe("Pagos devueltos successfully");
    });
  });

  // Posts
  describe("POST Crear Pago", () => {
    it("Debe crear una pago correctamente", async () => {
      const res = await request(app)
      .post("/pacientes/631fb73590ac706288335071/pagos")
      .send({
        precio_consulta: 3000,
        monto_abonado: 3000
      })
      expect(res.statusCode).toBe(201);
      expect(res._body.message).toBe("Pago creado correctamente");
    });
  }); 

  describe("POST Crear Pago sin body", () => {
    it("Debe Informar que no se recibio pago", async () => {
      const res = await request(app)
      .post("/pacientes/631fb73590ac706288335071/pagos")
      expect(res.statusCode).toBe(400);
      expect(res._body.message).toBe("Pago no recibido");
    });
  }); 

  describe("POST Crear Pago con datos incorrectos", () => {
    it("Debe Arrojar error al guardar", async () => {
      const res = await request(app)
      .post("/pacientes/631fb73590ac706288335071/pagos")
      .send({
        "Data no Valida": "Test"
      })
      expect(res.statusCode).toBe(500);
      expect(res._body.message).toBe("Datos de formulario incorrectos");
    });
  }); 

  // Patch
  describe("PATCH Editar Pago", () => {
    it("Debe editar una pago correctamente", async () => {
      const res = await request(app)
      .patch("/pacientes/631fb73590ac706288335071/pagos")
      .send({
        _id: '6371727282d0c26ce913a405',
        monto_abonado: 3000
      })
      expect(res.statusCode).toBe(200);
      expect(res._body.message).toBe("Pago editado correctamente");
    });
  }); 

  describe("PATCH Editar Pago sin body", () => {
    it("Debe Informar que no se recibio que pago editar", async () => {
      const res = await request(app)
      .patch("/pacientes/631fb73590ac706288335071/pagos")
      expect(res.statusCode).toBe(500);
      expect(res._body.message).toBe("Falta Pago ID");
    });
  }); 

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });