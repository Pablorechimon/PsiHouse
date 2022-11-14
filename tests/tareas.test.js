const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config({path: '../'});

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.CONNECT_STRING}/`);
  });
  
  // Gets
describe("GET Tareas de Usuario Psicologx", () => {
  it("Debe traer las tareas del psicologx", async () => {
    const res = await request(app).get("/tareas/usuario/63224baa1aff060bdd51f792");
    expect(res.statusCode).toBe(200);
    expect(res._body.message).toBe("Tarea devuelta correctamente");
  });
});

  describe("GET Tareas de usuario no existente", () => {
    it("Debe retornar error de usuario no existente", async () => {
      const res = await request(app).get("/tareas/usuario/UsuarioNoExistente");
      expect(res.statusCode).toBe(500);
      expect(res._body.message).toBe("Usuario no existente");
    });
  });  

  // Posts
  describe("POST Crear Tarea", () => {
    it("Debe crear una tarea correctamente", async () => {
      const res = await request(app)
      .post("/tareas")
      .send({
        id_usuario: '63224baa1aff060bdd51f792',
        descripcion: 'Tarea Test'
      })
      expect(res.statusCode).toBe(201);
      expect(res._body.message).toBe("Tarea creada correctamente");
    });
  }); 

  describe("POST Crear Tarea sin body", () => {
    it("Debe Informar que no se recibio tarea", async () => {
      const res = await request(app)
      .post("/tareas")
      expect(res.statusCode).toBe(501);
      expect(res._body.message).toBe("Tarea no recibida");
    });
  }); 

  describe("POST Crear Tarea sin Descripcion", () => {
    it("Debe Arrojar error al guardar", async () => {
      const res = await request(app)
      .post("/tareas")
      .send({
        "Data no Valida": "Test"
      })
      expect(res.statusCode).toBe(500);
      expect(res._body.message).toBe("Internal server error while saving");
    });
  }); 

  // Patch
  describe("PATCH Editar Tarea", () => {
    it("Debe editar una tarea correctamente", async () => {
      const res = await request(app)
      .patch("/tareas")
      .send({
        _id: '636fb25c96cd0f7f3886f9e3',
        finalizado: true
      })
      expect(res.statusCode).toBe(201);
      expect(res._body.message).toBe("Tarea Editada correctamente");
    });
  }); 

  describe("PATCH Editar Tarea sin body", () => {
    it("Debe Informar que no se recibio tarea", async () => {
      const res = await request(app)
      .patch("/tareas")
      expect(res.statusCode).toBe(501);
      expect(res._body.message).toBe("La tarea no existe");
    });
  }); 

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });