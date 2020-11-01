import { getRepository, Repository } from 'typeorm';

import Task from '@modules/tasks/infra/typeorm/entities/Task';

import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

class TasksRepository implements ITaskRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async create(data: ICreatTaskDTO): Promise<Task> {
    const task = this.ormRepository.create(data);

    await this.ormRepository.save(task);

    return task;
  }

  public async findByDate(date: Date): Promise<Task | undefined> {
    const findTask = await this.ormRepository.findOne({
      where: { date },
    });

    return findTask;
  }
}

export default TasksRepository;
