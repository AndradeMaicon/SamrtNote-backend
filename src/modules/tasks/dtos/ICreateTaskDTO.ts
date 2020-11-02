export default interface ICreatTaskDTO {
  user_id: string;
  date: Date;
  title: string;
  note?: string;
}
