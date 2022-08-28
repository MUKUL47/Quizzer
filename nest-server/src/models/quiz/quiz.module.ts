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
import { QuizService, UsersService } from 'src/services';
import { QuizController } from './quiz.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [QuizController],
  providers: [
    UsersService,
    QuizService,
    RepositoryProvider.getProvider(RepositoryProvider.QUIZ, Quiz),
    RepositoryProvider.getProvider(RepositoryProvider.USER, User),
    RepositoryProvider.getProvider(RepositoryProvider.MCQ, Mcq),
    RepositoryProvider.getProvider(RepositoryProvider.QUESTION, Question),
    JwtGuard,
  ],
})
export class QuizModule {}