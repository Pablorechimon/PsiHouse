const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../app");

require("dotenv").config({path: '../'});

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.CONNECT_STRING}/`);
  });
  
  // Posts
describe("POST Loguear Usuario", () => {
    it("Debe loguear usuario correctamente", async () => {
        const res = await request(app)
        .post("/usuario/login")
        .send({
            nick: "Maca",
            password: "Chipa123"
        })
        expect(res.statusCode).toBe(200);
        expect(res._body.message).toBe("Users loged succesfully");
      });
    }); 

describe("POST Loguear Usuario con contraseña invalida", () => {
    it("Debe loguear usuario correctamente", async () => {
        const res = await request(app)
        .post("/usuario/login")
        .send({
            nick: "Maca",
            password: "PasswordIncorrecto"
        })
        expect(res.statusCode).toBe(401);
        expect(res._body.message).toBe("Invalid Credentials");
      });
    });
  
describe("POST Loguear Usuario sin Nickname", () => {
    it("Debe loguear usuario correctamente", async () => {
        const res = await request(app)
        .post("/usuario/login")
        .send({
            password: "Chipa123"
        })
        expect(res.statusCode).toBe(400);
        expect(res._body.message).toBe("Nickname not recevied");
      });
    });

describe("POST Loguear Usuario con Nickname incorrecto", () => {
    it("Debe loguear usuario correctamente", async () => {
        const res = await request(app)
        .post("/usuario/login")
        .send({
            nick: "UsuarioNoExistente",
            password: "Chipa123"
        })
        expect(res.statusCode).toBe(500);
        expect(res._body.message).toBe("Usuario no existente");
      });
    });

  describe("POST Registrar Usuario", () => {
    it("Debe registrar usuario correctamente", async () => {
      const res = await request(app)
      .post("/usuario/register")
      .send({
        nick: "TestUser",
        nombre: "Test",
        apellido: "User",
        password: "Test123"
      })
      expect(res.statusCode).toBe(500);
      expect(res._body.message).toBe("Nickname already in use");
    });
  }); 

  describe("POST Registrar Usuario con mismo nickname", () => {
    it("Debe registrar usuario correctamente", async () => {
      const res = await request(app)
      .post("/usuario/register")
      .send({
        nick: "TestUser",
        nombre: "Test",
        apellido: "User",
        password: "Test123"
      })
      expect(res.statusCode).toBe(500);
      expect(res._body.message).toBe("Nickname already in use");
    });
  });

  describe("POST Registrar Usuario sin datos", () => {
    it("Debe registrar usuario correctamente", async () => {
      const res = await request(app)
      .post("/usuario/register")
      .send({
        nick: "TestUserNew",
      })
      expect(res.statusCode).toBe(400);
      expect(res._body.message).toBe("Insufficient data to create user");
    });
  });

  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });