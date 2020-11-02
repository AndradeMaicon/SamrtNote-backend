import FakeTaskRepository from '../repositories/fakes/FakeTaskRepository';

import CreateTaskService from './CreateTaskService';

let fakeTaskRepository: FakeTaskRepository;
let createTaskService: CreateTaskService;

describe('CreateTask', () => {
  beforeEach(() => {
    fakeTaskRepository = new FakeTaskRepository();

    createTaskService = new CreateTaskService(fakeTaskRepository);
  });

  it('should be able to create a new task', async () => {
    const task = await createTaskService.execute({
      date: new Date(),
      title: 'JestTest',
      note: 'sem nota',
    });

    expect(task).toHaveProperty('id');
  });

  it('should be able to create two task on the same time', async () => {
    const taskDate = new Date();

    await createTaskService.execute({
      date: taskDate,
      title: 'JestTest',
      note: 'sem nota',
    });

    expect(
      createTaskService.execute({
        date: taskDate,
        title: 'JestTest',
        note: 'sem nota',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
