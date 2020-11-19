import { uuid } from 'uuidv4';
import { isEqual, getMonth, getDate, getYear } from 'date-fns';

import Task from '@modules/tasks/infra/typeorm/entities/Task';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import IFindAllInDayDTO from '@modules/tasks/dtos/IFindAllInDayDTO';

class FakeTasksRepository implements ITasksRepository {
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

  public async findAllInDay({
    user_id,
    day,
    month,
    year,
  }: IFindAllInDayDTO): Promise<Task[] | undefined> {
    const findTasks = this.tasks.filter(
      task =>
        getDate(task.date) === day &&
        getMonth(task.date) + 1 === month &&
        getYear(task.date) === year &&
        task.user_id === user_id,
    );

    return findTasks;
  }
}

export default FakeTasksRepository;
