import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Mcq from './mcq.entity';
import Quiz from './quiz.entity';

@Entity({ name: 'question' })
export default class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Quiz, (quiz) => quiz.id, { onDelete: 'CASCADE' })
  quiz: number;

  @OneToMany(() => Mcq, (mcq) => mcq.question, {
    onDelete: 'CASCADE',
  })
  mcqs: Mcq[];
}