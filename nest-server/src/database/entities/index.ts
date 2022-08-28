import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { DATA_SOURCE } from '../database.provider';
import Mcq from './mcq.entity';
import Question from './question.entity';
import Quiz from './quiz.entity';
import Results from './results.entity';
import User from './user.entity';
export class RepositoryProvider {
  public static readonly USER = 'USER';
  public static readonly QUIZ = 'QUIZ';
  public static readonly QUESTION = 'QUESTION';
  public static readonly MCQ = 'MCQ';
  public static readonly RESULTS = 'RESULTS';

  public static getProvider<T extends Mcq | Question | Quiz | Results | User>(
    provide: string,
    entity: EntityTarget<T>,
  ) {
    return {
      provide,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
      inject: [DATA_SOURCE],
    };
  }
}

const entities = [User, Quiz, Question, Results, Mcq];
export { User, entities, Quiz, Question, Results, Mcq };
