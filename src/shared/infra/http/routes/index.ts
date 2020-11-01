import { Router } from 'express';
import tasksRoute from '@modules/tasks/infra/http/routes/task.routes';

const routes = Router();

routes.use('/tasks', tasksRoute);

export default routes;
