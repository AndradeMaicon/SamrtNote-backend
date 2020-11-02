import { container } from 'tsyringe';

import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRespository';

container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
