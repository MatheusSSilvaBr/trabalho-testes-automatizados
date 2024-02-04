const UserController  = require('../../../src/controllers/user-ctrl')
const User = require('../../../src/schemas/User')

describe('Create User Integration Testing', function() {
    it('should create a user', async function() {
      const req = { body: { email: 'email@gmail.com', password: 'password', name: 'John Doe'} }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      const mockUserId= jest.spyOn(User, 'create')
      mockUserId.mockImplementation(() => Promise.resolve({id : 1}));

      await UserController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ id: 1 })
    })
    it('should return 500 server error', async function() {
      const req = { body: { email: 'email@gmail.com', password: 'password', name: 'John Doe'} }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      const mockUserId = jest.spyOn(User, 'create')

      error = new Error('Server Error')
      error.status = 500

      mockUserId.mockImplementation(() => {throw error});

      await UserController.create(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith('Server Error')
    })
    it('should change password', async function() {
      const req = { body: { email: 'email@gmail.com'} }
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
      
      await UserController.changePassword(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'ok' })
    })
})