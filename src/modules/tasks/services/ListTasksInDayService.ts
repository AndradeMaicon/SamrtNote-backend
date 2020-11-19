import { injectable, inject } from 'tsyringe';

import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';
import ITasksRepository from '../repositories/ITasksRepository';

import Task from '../infra/typeorm/entities/Task';

// type IResponse = Array<{
//   hour: Date;
//   title: string;
//   task_id: string;
// }>;

@injectable()
class ListTasksInDay {
  constructor(
    @inject('TasksRepository')
    private tasksRepositry: ITasksRepository,
  ) {}

  public async execute({
    user_id,
    day,
    month,
    year,
  }: IFindAllInDayDTO): Promise<Task[] | undefined> {
    const UserTasksInDay = this.tasksRepositry.findAllInDay({
      user_id,
      day,
      month,
      year,
    });

    return UserTasksInDay;
  }
}

export default ListTasksInDay;
