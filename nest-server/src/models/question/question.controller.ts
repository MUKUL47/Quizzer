import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/database/entities';
import { JwtGuard } from 'src/guards/jwt.guard';
import { QuizService } from 'src/services';
import { QuestionService } from 'src/services/question.service';
import { QuestionCreateDto } from './dto';
@Controller('')
@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidUnknownValues: true }))
export class QuizController {
  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
  ) {}
  @Post('quiz/:quizId/question')
  async create(
    @Param() { quizId }: { quizId: number },
    @Body() question: QuestionCreateDto,
    @Req() { user }: { user: User },
  ) {
    if (!!!(await this.quizService.getById({ id: quizId, user })))
      throw new NotFoundException('Quiz not found');
    return this.questionService.createQuestion({ question, user, quizId });
  }

  @Get('question/:id')
  async getById(@Param('id') id: number, @Req() { user }: { user: User }) {
    return this.questionService.getById({ id, user });
  }

  @Delete('question/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async dleteById(@Param('id') id: number, @Req() { user }: { user: User }) {
    if (!!!(await this.questionService.getById({ id, user })))
      throw new NotFoundException('Quiz not found');
    return this.questionService.deleteById({ id, user });
  }
  // @Get(':id')
  // getById(@Param('id') id: number, @Req() { user }: { user: User }) {
  //   return this.quizService.getById({ id, user });
  // }
  // @Put(':id')
  // async updateById(
  //   @Param('id') id: number,
  //   @Body() body: QuizUpdateDto,
  //   @Req() { user }: { user: User },
  // ) {
  //   if (!!!(await this.quizService.getById({ id, user })))
  //     throw new NotFoundException('Quiz not found');
  //   return this.quizService.updateById({ id, payload: body, user });
  // }
  // @Get()
  // getAll(
  //   @Query() query: PaginatedResponse<string>,
  //   @Req() { user }: { user: User },
  // ) {
  //   return this.quizService.getAll({ data: query, user });
  // }
}
