import Tasks from '../models/Tasks';

class TasksRepository {
  private tasks: Tasks[];

  constructor() {
    this.tasks = [];
  }

  public index(): Tasks[] {
    return this.tasks;
  }

  public show(id: string): Tasks {
    const findTask = this.tasks.find(task => task.id === id);

    if (!findTask) {
      throw new Error('task not a fond');
    }

    return findTask;
  }

  public store(id: string, date: Date, title: string, note: string): Tasks {
    const task = new Tasks(id, date, title, note);

    this.tasks.push(task);

    return task;
  }

  public update(id: string, title: string): Tasks {
    const findIndexTask = this.tasks.findIndex(task => task.id === id);

    if (findIndexTask < 0) {
      throw new Error('task not a fond');
    }

    const task = this.tasks[findIndexTask];

    task.title = title;

    this.tasks.splice(findIndexTask, 1);

    this.tasks.push(task);

    return task;
  }

  public destroy(id: string): Tasks[] {
    const findIndexTask = this.tasks.findIndex(task => task.id === id);

    if (findIndexTask < 0) {
      throw new Error('task not a fond');
    }

    this.tasks.splice(findIndexTask, 1);

    return this.tasks;
  }
}

export default TasksRepository;
