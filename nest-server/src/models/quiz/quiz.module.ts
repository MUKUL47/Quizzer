import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { Quiz, RepositoryProvider, User } from 'src/database/entities';
import { JwtGuard } from 'src/guards/jwt.guard';
import { QuizService, UsersService } from 'src/services';
import { UsersModule } from '../users/users.module';
import { QuizController } from './quiz.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [QuizController],
  providers: [
    UsersService,
    QuizService,
    RepositoryProvider.getProvider(RepositoryProvider.QUIZ, Quiz),
    RepositoryProvider.getProvider(RepositoryProvider.USER, User),
    JwtGuard,
  ],
})
export class QuizModule {}
