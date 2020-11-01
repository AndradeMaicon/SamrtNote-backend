import { startOfHour } from 'date-fns';

import Task from '@modules/tasks/infra/typeorm/entities/Tasks';
import ITaskRepository from '@modules/tasks/repositories/ITaskRepository';

import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

class CreateTaskService {
  constructor(private taskRepository: ITaskRepository) {}

  public async execute({
    id,
    date,
    title,
    note,
  }: ICreateTaskDTO): Promise<Task> {
    const pasedDate = startOfHour(date);

    const findTaskInSameDate = await this.taskRepository.findByDate(pasedDate);

    if (findTaskInSameDate) {
      throw Error('This hour is already booked');
    }

    const task = await this.taskRepository.create({
      id,
      date: pasedDate,
      title,
      note,
    });

    return task;
  }
}

export default CreateTaskService;
