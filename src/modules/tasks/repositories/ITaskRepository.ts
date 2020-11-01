import ICreatTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import Tasks from '../infra/database/entities/Tasks';

interface ITaskRepoistory {
  getByDay(date: Date): Promise<Tasks[] | undefined>;

  detail(id: string): Promise<Tasks | undefined>;

  findByDate(date: Date): Promise<Tasks | undefined>;

  create(data: ICreatTaskDTO): Promise<Tasks>;

  update(id: string, title: string): Promise<Tasks>;

  delete(id: string): Promise<void>;
}

export default ITaskRepoistory;
