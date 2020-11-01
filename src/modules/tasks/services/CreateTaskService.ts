import { startOfHour } from 'date-fns';

import Task from '@modules/tasks/infra/database/entities/Tasks';
import TaskRepository from '@modules/tasks/infra/database/repositories/TaskRepository';

interface IRequest {
  id: string;
  parsedDate: Date;
  title: string;
  note: string;
}

class CreateTaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute({
    id,
    parsedDate,
    title,
    note,
  }: IRequest): Promise<Task> {
    const date = startOfHour(parsedDate);

    const findTaskInSameDate = await this.taskRepository.findByDate(date);

    if (findTaskInSameDate) {
      throw Error('This hour is already booked');
    }

    const task = await this.taskRepository.create({ id, date, title, note });

    return task;
  }
}

export default CreateTaskService;
