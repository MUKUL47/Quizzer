import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Quiz from './quiz.entity';

@Entity({ name: 'results' })
export default class Results {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, type: 'varchar', nullable: false })
  name: string;

  @Column({ length: 50, type: 'varchar', unique: true })
  rollNumber: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;
}
