import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import Task from '../infra/typeorm/entities/Task';

interface ITaskRepoistory {
  create(data: ICreatTaskDTO): Promise<Task>;
  findByDate(date: Date): Promise<Task | undefined>;
}

export default ITaskRepoistory;
