import AppError from '@shared/errors/AppErros';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakehashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakehashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakehashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
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
