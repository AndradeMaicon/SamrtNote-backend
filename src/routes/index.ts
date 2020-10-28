import express from 'express';
import TasksRoute from './task.routes';

const router = express.Router();

const tasksRoute = new TasksRoute();

router
  .post('/tasks', tasksRoute.store)
  .get('/tasks', tasksRoute.index)
  .get('/tasks/:id', tasksRoute.show);

export default router;
