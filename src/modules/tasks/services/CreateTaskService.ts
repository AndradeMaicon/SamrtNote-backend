import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErros';

import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import ITasksRepository from '../repositories/ITasksRepository';

import Task from '../infra/typeorm/entities/Task';

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({
    user_id,
    date,
    title,
    note,
  }: ICreateTaskDTO): Promise<Task> {
    const pasedDate = startOfHour(date);

    const findTaskInSameDate = await this.tasksRepository.findByDate(pasedDate);

    if (findTaskInSameDate) {
      throw new AppError('This hour is already booked');
    }

    const task = await this.tasksRepository.create({
      user_id,
      date: pasedDate,
      title,
      note,
    });

    return task;
  }
}

export default CreateTaskService;
