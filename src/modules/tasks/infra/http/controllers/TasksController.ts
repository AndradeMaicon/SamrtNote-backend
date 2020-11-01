import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateTaskService from '@modules/tasks/services/CreateTaskService';

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { taskDate, title, note } = request.body;

      const parsedDate = parseISO(taskDate);

      const createTask = container.resolve(CreateTaskService);

      const task = await createTask.execute({
        date: parsedDate,
        title,
        note,
      });

      return response.json(task);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
