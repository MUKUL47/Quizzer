import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import {
  Mcq,
  Question,
  Quiz,
  RepositoryProvider,
  User,
} from 'src/database/entities';
import { JwtGuard } from 'src/guards/jwt.guard';
import { McqService, QuizService, UsersService } from 'src/services';
import { QuestionService } from 'src/services/question.service';
import { McqController } from './mcq.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [McqController],
  providers: [
    UsersService,
    QuizService,
    McqService,
    QuestionService,
    RepositoryProvider.getProvider(RepositoryProvider.QUIZ, Quiz),
    RepositoryProvider.getProvider(RepositoryProvider.USER, User),
    RepositoryProvider.getProvider(RepositoryProvider.MCQ, Mcq),
    RepositoryProvider.getProvider(RepositoryProvider.QUESTION, Question),
    JwtGuard,
  ],
})
export class QuizModule {}
