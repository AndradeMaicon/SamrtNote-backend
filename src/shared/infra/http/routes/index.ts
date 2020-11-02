import { Router } from 'express';

import tasksRoute from '@modules/tasks/infra/http/routes/task.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/tasks', tasksRoute);
routes.use('/users', userRouter);

export default routes;
