import { Router } from 'express';
import tasksRoute from './task.routes';

const routes = Router();

routes.use('/tasks', tasksRoute);

export default routes;
