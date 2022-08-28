import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import Quiz from './quiz.entity';

@Entity({ name: 'user' })
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, type: 'varchar' })
  email: string;

  @Column({ length: 30, type: 'varchar' })
  password: string;

  @OneToMany(() => Quiz, (quiz) => quiz.createdBy)
  quiz: Quiz[];
}
