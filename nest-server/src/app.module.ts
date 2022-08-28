import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuestionModule } from './models/question/question.module';
import { QuizModule } from './models/quiz/quiz.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [UsersModule, AuthModule, QuizModule, QuestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
