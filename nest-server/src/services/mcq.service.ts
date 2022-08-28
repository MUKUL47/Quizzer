import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Mcq, RepositoryProvider, User } from 'src/database/entities';
import { McqCreateDto } from 'src/models/mcq/mcq.dto';
import { Repository } from 'typeorm';
type CreateMcq<T> = {
  mcq: T;
  user: User;
  questionId: number;
};
@Injectable()
export class McqService {
  constructor(
    @Inject(RepositoryProvider.MCQ)
    private readonly repository: Repository<Mcq>,
  ) {}

  async createMcq({
    mcq,
    user,
    questionId,
  }: CreateMcq<McqCreateDto>): Promise<Mcq> {
    const mcqBean = this.repository.create(mcq);
    mcqBean.question = questionId;
    return await this.repository.save(mcqBean);
  }

  async getById({ user, id }: { user: User; id: number }): Promise<Mcq> {
    const mcq = await this.repository
      .createQueryBuilder('mcq')
      .innerJoin('mcq.question', 'question', 'mcq.questionId = question.id')
      .innerJoin('question.quiz', 'quiz', 'question.quizId = quiz.id')
      .where('mcq.id = :id', {
        id,
      })
      .getOne();
    if (mcq === null) throw new NotFoundException('mcq not found');
    return mcq;
  }

  async deleteById({
    user,
    id,
  }: Partial<{ user: User; id: number }>): Promise<void> {
    await this.repository.query(
      `DELETE m from mcq m 
          INNER JOIN 
              question on question.id = m.questionId 
          INNER JOIN
              quiz on quiz.id = q.quizId 
          where quiz.createdById = ${user.id} AND m.id = ${id}`,
    );
  }
}
