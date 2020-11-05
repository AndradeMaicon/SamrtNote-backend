import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateTaskService from '@modules/tasks/services/CreateTaskService';

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, taskDate, title, note } = request.body;

    const parsedDate = parseISO(taskDate);

    const createTask = container.resolve(CreateTaskService);

    const task = await createTask.execute({
      user_id,
      date: parsedDate,
      title,
      note,
    });

    return response.json(task);
  }
}
