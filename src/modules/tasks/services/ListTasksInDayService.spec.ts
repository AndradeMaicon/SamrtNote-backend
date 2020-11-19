import FakeTasksRepository from '../repositories/fakes/FakeTasksRepository';

import ListTasksInDayService from './ListTasksInDayService';

let fakeTasksRepository: FakeTasksRepository;
let listTasksInDay: ListTasksInDayService;

describe('ListTasksInDay', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    listTasksInDay = new ListTasksInDayService(fakeTasksRepository);
  });

  it('should be able to list all tasks in the day of a user', async () => {
    const task01 = await fakeTasksRepository.create({
      user_id: 'user-id',
      title: 'Lavar o carro',
      date: new Date(2020, 10, 20, 8, 0, 0),
    });

    const task02 = await fakeTasksRepository.create({
      user_id: 'user-id',
      title: 'Preparar o Almoco',
      date: new Date(2020, 10, 20, 10, 0, 0),
    });

    const task03 = await fakeTasksRepository.create({
      user_id: 'user-id',
      title: 'Buscar as criancas',
      date: new Date(2020, 10, 20, 17, 0, 0),
    });

    const tasksInDay = await listTasksInDay.execute({
      user_id: 'user-id',
      day: 20,
      month: 11,
      year: 2020,
    });

    expect(tasksInDay).toEqual([task01, task02, task03]);
  });
});
