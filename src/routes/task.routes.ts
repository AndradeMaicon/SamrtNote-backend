/* eslint consistent-return: ["off"] */

import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import Tasks from '../models/Tasks';

const taskRouter = Router();

const tasks: Tasks[] = [];

taskRouter.post('/', (request, response) => {
  const { id, date, title, note } = request.body;

  const taskDate = startOfHour(parseISO(date));

  const task = new Tasks(id, taskDate, title, note);

  tasks.push(task);

  return response.json(task);
});

taskRouter.get('/', (request, response) => {
  return response.json(tasks);
});

taskRouter.get('/:id', (request, response) => {
  const { id } = request.params;

  const findTask = tasks.find(task => task.id === id);

  return response.json(findTask);
});

taskRouter.put('/:id', (request, response) => {
  const { id } = request.params;
  const { title } = request.body;

  const findTask = tasks.find(task => task.id === id);

  if (!findTask) {
    throw new Error('task not a fond');
  }

  findTask.title = title;

  return response.json(findTask);
});

taskRouter.delete('/:id', (request, response) => {
  const { id } = request.params;

  const findIndexTask = tasks.findIndex(task => task.id === id);

  if (!findIndexTask) {
    throw new Error('Task not a found');
  }

  tasks.splice(findIndexTask, 1);

  return response.send();
});

export default taskRouter;
