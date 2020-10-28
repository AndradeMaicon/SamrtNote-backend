/* eslint consistent-return: ["off"] */

import { Request, Response, NextFunction } from 'express';
import { startOfHour, parseISO } from 'date-fns';

interface ITaskProps {
  id: string;
  taskDate: Date;
  title: string;
  note?: string;
}

class TasksRoute {
  public async store(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    try {
      const { id, newDate, title, note } = request.body;

      const taskDate = startOfHour(parseISO(newDate));

      const taskBank: ITaskProps[] = [];

      const newTask = {
        id,
        taskDate,
        title,
        note,
      };

      taskBank.push(newTask);

      return response.json(newTask);
    } catch (error) {
      next(error);
    }
  }

  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const taskBank: ITaskProps[] = [
      {
        id: '1',
        taskDate: new Date(),
        title: 'Lavar o carro',
        note: 'Passar cera',
      },
      {
        id: '2',
        taskDate: new Date(),
        title: 'Lavar o carro',
        note: 'Passar cera',
      },
    ];

    try {
      return response.json(taskBank);
    } catch (error) {
      next(error);
    }
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | undefined> {
    const taskBank: ITaskProps[] = [
      {
        id: '1',
        taskDate: new Date(),
        title: 'Lavar o carro',
        note: 'Passar cera',
      },
      {
        id: '2',
        taskDate: new Date(),
        title: 'Lavar o carro',
        note: 'Passar cera',
      },
    ];

    try {
      const { id } = request.params;

      const findTask = taskBank.find(task => id === task.id);

      return response.json(findTask);
    } catch (error) {
      next(error);
    }
  }
}

export default TasksRoute;
