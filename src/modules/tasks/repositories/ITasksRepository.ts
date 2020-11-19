import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import IFindAllInDayDTO from '@modules/tasks/dtos/IFindAllInDayDTO';
import Task from '../infra/typeorm/entities/Task';

interface ITaskRepoistory {
  create(data: ICreatTaskDTO): Promise<Task>;
  findByDate(date: Date): Promise<Task | undefined>;
  findAllInDay(data: IFindAllInDayDTO): Promise<Task[] | undefined>;
}

export default ITaskRepoistory;
