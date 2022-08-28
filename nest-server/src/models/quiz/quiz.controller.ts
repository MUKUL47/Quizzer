import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/database/entities';
import { JwtGuard } from 'src/guards/jwt.guard';
import { PaginatedResponse } from 'src/interfaces';
import { QuizService } from 'src/services';
import { QuizCreateDto, QuizUpdateDto } from './quiz.dto';
@Controller('quiz')
@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidUnknownValues: true }))
export class QuizController {
  constructor(private quizService: QuizService) {}
  @Post()
  create(@Body() quiz: QuizCreateDto, @Req() { user }: { user: User }) {
    return this.quizService.createQuiz({ quiz, user });
  }

  @Get(':id')
  getById(@Param('id') id: number, @Req() { user }: { user: User }) {
    return this.quizService.getById({ id, user });
  }
  @Put(':id')
  async updateById(
    @Param('id') id: number,
    @Body() body: QuizUpdateDto,
    @Req() { user }: { user: User },
  ) {
    if (!!!(await this.quizService.getById({ id, user })))
      throw new NotFoundException('Quiz not found');
    return this.quizService.updateById({ id, payload: body, user });
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number, @Req() { user }: { user: User }) {
    if (!!!(await this.quizService.getById({ id, user })))
      throw new NotFoundException('Quiz not found');
    return this.quizService.deleteById({ id });
  }
  @Get()
  getAll(
    @Query() query: PaginatedResponse<string>,
    @Req() { user }: { user: User },
  ) {
    return this.quizService.getAll({ data: query, user });
  }
}
