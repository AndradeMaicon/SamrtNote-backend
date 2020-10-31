/* eslint consistent-return: ["off"] */

import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import TaskRepository from '../repositories/TaskRepository';

const taskRouter = Router();
const taskRepository = new TaskRepository();

taskRouter.post('/', (request, response) => {
  const { id, taskDate, title, note } = request.body;

  const parsedDate = parseISO(taskDate);
  const date = startOfHour(parsedDate);

  const findTaskInSameDate = taskRepository.findByDate(date);

  if (findTaskInSameDate) {
    return response
      .status(400)
      .json({ message: 'This hour is already booked' });
  }

  const task = taskRepository.create({ id, date, title, note });

  return response.json(task);
});

taskRouter.get('/', (request, response) => {
  const allTasks = taskRepository.getAll();

  return response.json(allTasks);
});

taskRouter.get('/:id', (request, response) => {
  try {
    const { id } = request.params;

    const findTask = taskRepository.singleSearch(id);

    return response.json(findTask);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

taskRouter.put('/:id', (request, response) => {
  try {
    const { id } = request.params;
    const { title } = request.body;

    const updatedTask = taskRepository.update(id, title);

    return response.json(updatedTask);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

taskRouter.delete('/:id', (request, response) => {
  try {
    const { id } = request.params;

    const taskList = taskRepository.delete(id);

    return response.json(taskList);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default taskRouter;
