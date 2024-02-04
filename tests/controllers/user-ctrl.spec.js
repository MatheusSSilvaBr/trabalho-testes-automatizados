const UserController = require('../../src/controllers/user-ctrl')
const UserService = require('../../src/services/user-service')

describe('UserController', () => {
    describe('create', () => {
        it('should throw an error if email is invalid', async () => {
            const req = { body: { email: 'invalid', password: 'password' } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    
            await UserController.create(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith('Email inválido')
        })

        it('should throw an error if password is invalid', async () => {
            const req = { body: { email: 'valid@gmail.com', password: '' } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    
            await UserController.create(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith('Senha inválida')
        })

        it('should return a token if user exists', async () => {
            const req = { body: { email: 'valid@gmail.com', password: 'password' } }
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

            const mockId = jest.spyOn(UserService, 'createUser')
            mockId.mockImplementation(() => Promise.resolve({id : 1}));

            await UserController.create(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ id: 1 })
        })
    })
    describe('changePassword', () => {
          it('should return a message if change password', async () => {
            const req = { body: { email: 'valid@gmail.com', password: 'password' }}
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

            await UserController.changePassword(req, res)
            
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({ message: 'ok' })
        })
    })
})