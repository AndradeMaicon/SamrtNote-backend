import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid, ...data });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }
}

export default FakeUserRepository;
