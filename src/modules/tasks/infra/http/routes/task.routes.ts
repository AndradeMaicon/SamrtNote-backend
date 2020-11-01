import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateTaskService from '@modules/tasks/services/CreateTaskService';

const taskRouter = Router();

taskRouter.post('/', async (request, response) => {
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
});

export default taskRouter;
