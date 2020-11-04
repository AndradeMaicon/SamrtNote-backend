import { Router } from 'express';

import ensureAuthenticate from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TasksController from '../controllers/TasksController';

const taskRouter = Router();
const tasksController = new TasksController();

taskRouter.use(ensureAuthenticate);

taskRouter.post('/', tasksController.create);

export default taskRouter;
