import { Router } from 'express';

import tasksRoute from '@modules/tasks/infra/http/routes/task.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/tasks', tasksRoute);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

export default routes;
