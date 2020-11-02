import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('should be able create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmai.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able create a new user with a email already booked', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmai.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@gmai.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
