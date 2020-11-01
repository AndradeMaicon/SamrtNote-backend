import { getRepository, Repository } from 'typeorm';

import Tasks from '@modules/tasks/infra/typeorm/entities/Tasks';

import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';
import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

class TasksRepository implements ITaskRepository {
  private ormRepository: Repository<Tasks>;

  constructor() {
    this.ormRepository = getRepository(Tasks);
  }

  public async getByDay(date: Date): Promise<Tasks[] | undefined> {
    const tasksOfDay = await this.ormRepository.find({
      where: { date },
    });

    return tasksOfDay;
  }

  public async detail(id: string): Promise<Tasks | undefined> {
    const findTask = await this.ormRepository.findOne(id);

    return findTask;
  }

  public async findByDate(date: Date): Promise<Tasks | undefined> {
    const findTask = await this.ormRepository.findOne({
      where: { date },
    });

    return findTask;
  }

  public async create(data: ICreatTaskDTO): Promise<Tasks> {
    const task = this.ormRepository.create(data);

    await this.ormRepository.save(task);

    return task;
  }

  public async update(id: string, title: string): Promise<void> {
    const findTask = await this.ormRepository.findOne(id);

    if (!findTask) {
      throw Error('Taks not a fond');
    }

    this.ormRepository.save({
      id,
      title,
    });
  }

  public async delete(id: string): Promise<void> {
    const findTask = await this.ormRepository.findOne(id);

    if (!findTask) {
      throw Error('Taks not a fond');
    }

    this.ormRepository.remove(findTask);
  }
}

export default TasksRepository;
