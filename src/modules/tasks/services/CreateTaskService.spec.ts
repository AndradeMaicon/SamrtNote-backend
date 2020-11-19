import AppError from '@shared/errors/AppErros';

import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';

import CreateTaskService from './CreateTaskService';

let fakeTasksRepository: FakeTasksRepository;
let createTaskService: CreateTaskService;

describe('CreateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    createTaskService = new CreateTaskService(fakeTasksRepository);
  });

  it('should be able to create a new task', async () => {
    const task = await createTaskService.execute({
      user_id: '123456',
      date: new Date(),
      title: 'JestTest',
      note: 'sem nota',
    });

    expect(task).toHaveProperty('id');
  });

  it('should be able to create two task on the same time', async () => {
    const taskDate = new Date();

    await createTaskService.execute({
      user_id: '123456',
      date: taskDate,
      title: 'JestTest',
      note: 'sem nota',
    });

    expect(
      createTaskService.execute({
        user_id: '123456',
        date: taskDate,
        title: 'JestTest',
        note: 'sem nota',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
