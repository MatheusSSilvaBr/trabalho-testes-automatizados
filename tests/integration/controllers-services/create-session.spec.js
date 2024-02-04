const SessionController = require('../../../src/controllers/session-ctrl');
const User = require('../../../src/schemas/User');

const mockUserId = jest.spyOn(User, 'create');
mockUserId.mockImplementation(() => Promise.resolve({id : 1}));

describe('Create Session Controller', () => {
  it('should create a session', async function(){
    const user = {email: 'email@gmail.com', password: '123456'}
    const req = { body: user};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockUserFind = jest.spyOn(User, 'findOne');
    mockUserFind.mockImplementation(() => Promise.resolve(user));

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.token).not.toBeNull();
  })

  it('should return 500 Server Error', async function(){
    const req = { body: {email: 'email@gmail.com', password: '123456'}};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    error = new Error('Server Error')
    error.status = 500
    const mockUserFind = jest.spyOn(User, 'findOne');
    mockUserFind.mockImplementation(() => {throw error});

    await SessionController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith('Server Error');

  })
});