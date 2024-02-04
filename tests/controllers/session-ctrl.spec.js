const SessionController = require('../../src/controllers/session-ctrl')
const UserService = require('../../src/services/user-service')
const SessionService = require('../../src/services/session-service')

describe('SessionController', () => {
    it('should throw an error if email is invalid', async () => {
      const req = { body: { email: 'invalid', password: 'password' } }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      await SessionController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith('Email inválido')
    })

    it('should throw an error if password is invalid', async () => {
      const req = { body: { email: 'email@email.com', password: '' } }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      await SessionController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith('Senha inválida')
      })

    it('should throw an error if user is not found', async () => {
      const mockUserExistsAndCheckPassword = jest.spyOn(UserService, 'userExistsAndCheckPassword');
      mockUserExistsAndCheckPassword.mockImplementation(() => Promise.resolve(false));

      const req = { body: { email: 'email@email.com', password: 'password' } }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      await SessionController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith('Usuário não encontrado')
      })

    it('should return a token if user exists', async () => {
      const mockUserExistsAndCheckPassword = jest.spyOn(UserService, 'userExistsAndCheckPassword');
      mockUserExistsAndCheckPassword.mockImplementation(() => Promise.resolve(true));

      const mockToken = jest.spyOn(SessionService, 'generateToken');
      mockToken.mockImplementation(() => Promise.resolve('token'));

      const req = { body: { email: 'email@email.com', password: 'password' } }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      await SessionController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
    })
})