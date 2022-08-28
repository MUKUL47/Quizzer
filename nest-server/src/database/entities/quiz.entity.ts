import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Question from './question.entity';
import Results from './results.entity';
import User from './user.entity';

@Entity({ name: 'quiz' })
export default class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, type: 'varchar', nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.quiz)
  createdBy: number;

  @OneToMany(() => Question, (question) => question.quiz, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
  })
  questions!: Question[];

  @OneToMany(() => Results, (results) => results.quiz, {
    onDelete: 'CASCADE',
  })
  results: Results[];
}
