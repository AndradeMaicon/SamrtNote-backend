import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.ormRepository.findOne(email);

    return findUser;
  }
}

export default UserRepository;
