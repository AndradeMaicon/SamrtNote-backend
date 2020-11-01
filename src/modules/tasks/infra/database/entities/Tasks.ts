export default class Tasks {
  id: string;

  date: Date;

  title: string;

  note?: string;

  constructor({ id, date, title, note }: Tasks) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.note = note;
  }
}
