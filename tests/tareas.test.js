const mockingoose = require('mockingoose')
const httpMocks = require('node-mocks-http');
const Tarea = require('../models/tarea.model')
const tareaMock = require('../mock/tareaMock')
const { get, create, update } = require('../controllers/tareaController');

describe('GET /tareas', () => {
    it('Should retrieve tareas successfully', async () => {
        mockingoose(Tarea).toReturn(tareaMock, "find")
        const req = httpMocks.createRequest({})
        const res = httpMocks.createResponse()
        await get(req, res);

        // expect(res.statusCode).toEqual(200)
        // console.log(res._getJSONData().message)
        expect(res._getJSONData().message).toEqual('Tarea retrieved successfully');
    })

    it('Should fail to get tareas', async () => {
        mockingoose(Tarea).toReturn(new Error('Some Error'), "find")
        const req = httpMocks.createRequest({})
        const res = httpMocks.createResponse({eventEmitter: require('events').EventEmitter})
        await get(req, res)
        
        console.log(res)
        // expect(res._getJSONData().message).toEqual('Tarea retrieved successfully');
        // expect(result.statusCode).toEqual(201)
    })
})

// describe('POST /tareas', () => {
//     it('Should create new Tarea', async () => {
//         mockingoose(Tarea).toReturn(tareaMock, "save")
//         const req = httpMocks.createRequest({
//             method: 'POST',
//             url: '/tareas',
//             body : {
//                 'tarea' : 'This is a new Tarea'
//             }
//         })
//         const res = httpMocks.createResponse()
//         await create(req, res)

//         // const json = res._getJSONData()
//         // console.log(json)
//         expect(res.statusCode).toEqual(201)
//     })
// })