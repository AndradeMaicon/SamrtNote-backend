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

export default taskRouter;
