import { getRepository, Repository, Raw } from 'typeorm';

import Task from '@modules/tasks/infra/typeorm/entities/Task';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import IFindAllInDayDTO from '@modules/tasks/dtos/IFindAllInDayDTO';

class TasksRepository implements ITasksRepository {
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

  public async findAllInDay({
    user_id,
    day,
    month,
    year,
  }: IFindAllInDayDTO): Promise<Task[] | undefined> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const tasks = await this.ormRepository.find({
      where: {
        user_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return tasks;
  }
}

export default TasksRepository;
