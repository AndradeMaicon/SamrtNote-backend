import { isEqual } from 'date-fns';
import Tasks from '../models/Tasks';

interface ICreatTask {
  id: string;
  date: Date;
  title: string;
  note: string;
}

class TasksRepository {
  private tasks: Tasks[];

  constructor() {
    this.tasks = [];
  }

  public getAll(): Tasks[] {
    return this.tasks;
  }

  public singleSearch(id: string): Tasks {
    const findTask = this.tasks.find(task => task.id === id);

    if (!findTask) {
      throw Error('task not a fond');
    }

    return findTask;
  }

  public findByDate(date: Date): Tasks | null {
    const taskOnDate = this.tasks.find(task => isEqual(date, task.date));

    return taskOnDate || null;
  }

  public create({ id, date, title, note }: ICreatTask): Tasks {
    const task = new Tasks({ id, date, title, note });

    this.tasks.push(task);

    return task;
  }

  public update(id: string, title: string): Tasks {
    const findIndexTask = this.tasks.findIndex(task => task.id === id);

    if (findIndexTask < 0) {
      throw Error('task not a fond');
    }

    const task = this.tasks[findIndexTask];

    task.title = title;

    this.tasks.splice(findIndexTask, 1);

    this.tasks.push(task);

    return task;
  }

  public delete(id: string): Tasks[] {
    const findIndexTask = this.tasks.findIndex(task => task.id === id);

    if (findIndexTask < 0) {
      throw Error('task not a fond');
    }

    this.tasks.splice(findIndexTask, 1);

    return this.tasks;
  }
}

export default TasksRepository;