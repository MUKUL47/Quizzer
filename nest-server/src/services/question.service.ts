import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Question, RepositoryProvider, User } from 'src/database/entities';
import { QuestionCreateDto } from 'src/models/question/dto';
import { Repository } from 'typeorm';
type CreateQuestion<T> = {
  question: T;
  user: User;
  quizId: number;
};
@Injectable()
export class QuestionService {
  constructor(
    @Inject(RepositoryProvider.QUESTION)
    private readonly repository: Repository<Question>,
  ) {}

  async createQuestion({
    question,
    user,
    quizId,
  }: CreateQuestion<QuestionCreateDto>): Promise<Question> {
    const questionBean = this.repository.create(question);
    questionBean.quiz = quizId;
    return await this.repository.save(questionBean);
  }

  async createQuestions({
    question,
    user,
    quizId,
  }: CreateQuestion<QuestionCreateDto[]>): Promise<Question[]> {
    const questionBeans = question.map((bean) => {
      const questionBean = this.repository.create(bean);
      questionBean.quiz = quizId;
      return questionBean;
    });
    await this.repository.insert(questionBeans);
    return questionBeans;
  }

  async getById({ user, id }: { user: User; id: number }): Promise<Question> {
    const question = await this.repository
      .createQueryBuilder('question')
      .innerJoin('question.quiz', 'quiz', 'question.quizId = quiz.id')
      .where('question.id = :id', {
        id,
      })
      .getOne();
    if (question === null) throw new NotFoundException('Question not found');
    return question;
  }

  async deleteById({
    user,
    id,
  }: Partial<{ user: User; id: number }>): Promise<void> {
    await this.repository.query(
      `DELETE q from question q INNER JOIN quiz on quiz.id = q.quizId where quiz.createdById = ${user.id} AND q.id = ${id}`,
    );
  }
}
