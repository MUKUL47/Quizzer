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
import { CryptoService, QuizService, UsersService } from '.';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    CryptoService,
    QuizService,
    UsersService,
    JwtGuard,
    RepositoryProvider.getProvider(RepositoryProvider.QUIZ, Quiz),
    RepositoryProvider.getProvider(RepositoryProvider.USER, User),
    RepositoryProvider.getProvider(RepositoryProvider.MCQ, Mcq),
    RepositoryProvider.getProvider(RepositoryProvider.QUESTION, Question),
  ],
  exports: [CryptoService, QuizService, UsersService, JwtGuard],
})
export class ServicesModule {}
