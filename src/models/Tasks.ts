export default class Tasks {
  id: string;

  taskDate: Date;

  title: string;

  note?: string;

  constructor(id: string, taskDate: Date, title: string, note: string) {
    this.id = id;
    this.taskDate = taskDate;
    this.title = title;
    this.note = note;
  }
}
