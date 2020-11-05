import AppError from '@shared/errors/AppErros';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakehashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakehashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakehashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
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
    ).rejects.toBeInstanceOf(AppError);
  });
});
