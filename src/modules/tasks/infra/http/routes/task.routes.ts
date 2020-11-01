import { Router } from 'express';

import TasksController from '../controllers/TasksController';

const taskRouter = Router();
const tasksController = new TasksController();

taskRouter.post('/', tasksController.create);

export default taskRouter;
