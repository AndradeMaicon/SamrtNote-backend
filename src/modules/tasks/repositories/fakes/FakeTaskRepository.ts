import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Task from '@modules/tasks/infra/typeorm/entities/Task';

import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

class FakeTasksRepository implements ITaskRepository {
  private tasks: Task[] = [];

  public async create(data: ICreatTaskDTO): Promise<Task> {
    const task = new Task();

    Object.assign(task, { id: uuid, ...data });

    this.tasks.push(task);

    return task;
  }

  public async findByDate(date: Date): Promise<Task | undefined> {
    const findTask = this.tasks.find(task => isEqual(task.date, date));

    return findTask;
  }
}

export default FakeTasksRepository;
