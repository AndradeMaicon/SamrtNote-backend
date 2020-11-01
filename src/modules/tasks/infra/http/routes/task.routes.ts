/* eslint consistent-return: ["off"] */

import { Router } from 'express';
import { parseISO } from 'date-fns';

import TaskRepository from '@modules/tasks/infra/database/repositories/TaskRepository';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';

const taskRouter = Router();
const taskRepository = new TaskRepository();

taskRouter.post('/', async (request, response) => {
  try {
    const { id, taskDate, title, note } = request.body;

    const parsedDate = parseISO(taskDate);

    const createTaskService = new CreateTaskService(taskRepository);

    const task = await createTaskService.execute({
      id,
      parsedDate,
      title,
      note,
    });

    return response.json(task);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

taskRouter.get('/', async (request, response) => {
  const date = request.header('date');

  if (!date) {
    throw Error('Date not a fond');
  }

  const parsedDate = parseISO(date);

  const allTasks = await taskRepository.getByDay(parsedDate);

  return response.json(allTasks);
});

taskRouter.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const findTask = await taskRepository.detail(id);

    return response.json(findTask);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

taskRouter.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { title } = request.body;

    const updatedTask = await taskRepository.update(id, title);

    return response.json(updatedTask);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

taskRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const taskList = await taskRepository.delete(id);

    return response.json(taskList);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default taskRouter;
