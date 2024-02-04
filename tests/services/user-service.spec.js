const UserService = require('../../src/services/user-service')
const User = require('../../src/schemas/User')

describe('UserService', function() {  
    describe('createUser', function() {
        it('should create a user', async function() {
          const mockUserId = jest.spyOn(User, 'create')
          mockUserId.mockImplementation(() => Promise.resolve({id : 1}));

          const user = await UserService.createUser({name: 'John Doe', email: 'email@gmail.com', password: 'password'}) 

          expect(user).toBeDefined()
        })
    })
    describe('userExistsAndCheckPassword', function() {
        it('should return false if user does not exists', async function() {
          const mockUserId = jest.spyOn(User, 'findOne')
          mockUserId.mockImplementation(() => Promise.resolve(null));

          const user = await UserService.userExistsAndCheckPassword({email: 'email@gmail.com'})
          expect(user).toBeFalsy()
        })

        it('should throw an error if password does not match', async function() {
          const mockUserId = jest.spyOn(User, 'findOne')
          mockUserId.mockImplementation(() => Promise.resolve({password: 'password'}));

          try {
            await UserService.userExistsAndCheckPassword({email: 'email.@gmail.com', password: 'wrongpassword'})
          } catch (error) {
            expect(error).toEqual({ status: 400, message: 'As senhas não batem' })
          }
        })

        it('should return true if user exists and password matches', async function() {
          const mockUserId = jest.spyOn(User, 'findOne')
          mockUserId.mockImplementation(() => Promise.resolve({password: 'password'}));

          const user = await UserService.userExistsAndCheckPassword({email: 'email.@gmail.com', password: 'password'})
          expect(user).toBeTruthy()
        })
    })
})
