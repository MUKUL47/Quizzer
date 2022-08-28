import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Question from './question.entity';

@Entity({ name: 'mcq' })
export default class Mcq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bool', nullable: true })
  isCorrect: boolean;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Question, (question) => question.mcqs)
  question: Question;
}
