/* eslint consistent-return: ["off"] */

import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import TaskRepository from '../repositories/TaskRepository';

const taskRouter = Router();
const taskRepository = new TaskRepository();

taskRouter.post('/', (request, response) => {
  const { id, date, title, note } = request.body;

  const taskDate = startOfHour(parseISO(date));

  const task = taskRepository.store(id, taskDate, title, note);

  return response.json(task);
});

taskRouter.get('/', (request, response) => {
  const allTasks = taskRepository.index();

  return response.json(allTasks);
});

taskRouter.get('/:id', (request, response) => {
  const { id } = request.params;

  const findTask = taskRepository.show(id);

  return response.json(findTask);
});

taskRouter.put('/:id', (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  const updatedTask = taskRepository.update(id, title);

  return response.json(updatedTask);
});

taskRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  const taskList = taskRepository.destroy(id);

  return response.json(taskList);
});

export default taskRouter;
