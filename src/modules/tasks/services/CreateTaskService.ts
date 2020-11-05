import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErros';

import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import ITaskRepository from '../repositories/ITaskRepository';

import Task from '../infra/typeorm/entities/Task';

@injectable()
class CreateTaskService {
  constructor(
    @inject('TaskRepository')
    private taskRepository: ITaskRepository,
  ) {}

  public async execute({
    user_id,
    date,
    title,
    note,
  }: ICreateTaskDTO): Promise<Task> {
    const pasedDate = startOfHour(date);

    const findTaskInSameDate = await this.taskRepository.findByDate(pasedDate);

    if (findTaskInSameDate) {
      throw new AppError('This hour is already booked');
    }

    const task = await this.taskRepository.create({
      user_id,
      date: pasedDate,
      title,
      note,
    });

    return task;
  }
}

export default CreateTaskService;
