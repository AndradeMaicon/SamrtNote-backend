import { startOfHour } from 'date-fns';

import Task from '../models/Tasks';
import TaskRepository from '../repositories/TaskRepository';

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

  public execute({ id, parsedDate, title, note }: IRequest): Task {
    const date = startOfHour(parsedDate);

    const findTaskInSameDate = this.taskRepository.findByDate(date);

    if (findTaskInSameDate) {
      throw Error('This hour is already booked');
    }

    const task = this.taskRepository.create({ id, date, title, note });

    return task;
  }
}

export default CreateTaskService;
