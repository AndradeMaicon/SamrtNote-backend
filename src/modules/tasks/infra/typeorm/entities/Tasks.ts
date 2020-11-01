import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export default class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('time with time zone')
  date: Date;

  @Column()
  title: string;

  @Column()
  note?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
