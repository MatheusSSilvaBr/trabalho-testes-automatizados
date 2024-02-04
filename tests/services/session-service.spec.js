const SessionService = require('../../src/services/session-service')

describe('SessionService', function() {
    it('should generate a token', function() {
        const token = SessionService.generateToken({ email: 'email@gmail.com'})
        expect(token).toBeDefined()
    })
})