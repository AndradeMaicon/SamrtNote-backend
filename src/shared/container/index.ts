import { container } from 'tsyringe';

import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import TaskRepository from '@modules/tasks/infra/typeorm/repositories/TaskRepository';

container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
