import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRespository';

container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository,
);
