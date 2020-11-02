import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUserRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const emailCheked = await this.userRepository.findByEmail(email);

    if (emailCheked) {
      throw new Error('E-mail already booked');
    }

    const user = await this.userRepository.create({ name, email, password });

    return user;
  }
}

export default CreateUserService;
