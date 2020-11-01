import { isEqual } from 'date-fns';
import Tasks from '@modules/tasks/infra/database/entities/Tasks';

import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

class TasksRepository implements ITaskRepository {
  private tasks: Tasks[];

  constructor() {
    this.tasks = [];
  }

  public async getAll(): Promise<Tasks[]> {
    const taskArrey: Tasks[] = this.tasks;

    return taskArrey;
  }

  public async singleSearch(id: string): Promise<Tasks> {
    const findTask = await this.tasks.find(task => task.id === id);

    if (!findTask) {
      throw Error('task not a fond');
    }

    return findTask;
  }

  public async findByDate(date: Date): Promise<Tasks | undefined> {
    const taskOnDate = this.tasks.find(task => isEqual(date, task.date));

    return taskOnDate || undefined;
  }

  public async create(data: ICreatTaskDTO): Promise<Tasks> {
    const task = new Tasks(data);

    this.tasks.push(task);

    return task;
  }

  public async update(id: string, title: string): Promise<Tasks> {
    const findIndexTask = await this.tasks.findIndex(task => task.id === id);

    if (findIndexTask < 0) {
      throw Error('task not a fond');
    }

    const task = this.tasks[findIndexTask];

    task.title = title;

    this.tasks.splice(findIndexTask, 1);

    this.tasks.push(task);

    return task;
  }

  public async delete(id: string): Promise<void> {
    const findIndexTask = await this.tasks.findIndex(task => task.id === id);

    if (findIndexTask < 0) {
      throw Error('task not a fond');
    }

    this.tasks.splice(findIndexTask, 1);
  }
}

export default TasksRepository;
