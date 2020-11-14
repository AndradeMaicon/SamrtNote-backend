import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRespository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
