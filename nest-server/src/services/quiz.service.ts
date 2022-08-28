import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  Mcq,
  Question,
  Quiz,
  RepositoryProvider,
  User,
} from 'src/database/entities';
import { PaginatedResponse, UpdatePayload, UserParams } from 'src/interfaces';
import { QuizCreateDto } from 'src/models/quiz/dto';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @Inject(RepositoryProvider.QUIZ)
    private readonly repository: Repository<Quiz>,
  ) {}

  async createQuiz({
    quiz,
    user,
  }: {
    quiz: QuizCreateDto;
    user: User;
  }): Promise<Quiz> {
    const quizBean = this.repository.create(quiz);
    quizBean.createdBy = user.id;
    return await this.repository.save(this.repository.create(quizBean));
  }

  async getById({ id, user }: { id: number; user: User }): Promise<Quiz> {
    const quiz = await this.repository
      .createQueryBuilder('quiz')
      .leftJoinAndMapMany(
        'quiz.question',
        Question,
        'question',
        'question.quizId = quiz.id',
      )
      .leftJoinAndMapMany(
        'question.mcq',
        Mcq,
        'mcq',
        'mcq.questionId = question.id',
      )
      .andWhere('quiz.id = :quizId', { quizId: id })
      .andWhere('quiz.createdById = :id', { id: user.id })
      .getOne();
    if (quiz === null) throw new NotFoundException('Quiz not found');
    return quiz;
  }

  async updateById({ id, payload }: UpdatePayload<Partial<Quiz>>) {
    await this.repository.update({ id }, payload);
    return await this.repository.findOne({ where: { id } });
  }
  async deleteById({ id }: { id: number }) {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  async getAll(userParams: UserParams<PaginatedResponse<string>>) {
    const { user, data } = userParams;
    const items = await this.repository
      .createQueryBuilder('quiz')
      .limit(Number((isNaN(data.limit) && 6e6) || data.limit))
      // .orderBy(data.orderBy || 'title', data.sort)
      .skip(data.skip)
      .leftJoinAndMapMany(
        'quiz.question',
        Question,
        'question',
        'question.quizId = quiz.id',
      )
      .leftJoinAndMapMany(
        'question.mcq',
        Mcq,
        'mcq',
        'mcq.questionId = question.id',
      )
      .andWhere('quiz.createdById = :id', { id: user.id })
      .getMany();
    const [, count] = await this.repository.findAndCount({
      where: { createdBy: user.id },
    });
    return { total: count, items };
  }
}
