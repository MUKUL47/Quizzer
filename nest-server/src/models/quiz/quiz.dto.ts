import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested, IsDefined } from 'class-validator';
export class QuizCreateDto {
  @IsDefined({ always: true })
  @IsNotEmpty()
  title: string;

  // @IsDefined({ always: true })
  // @ValidateNested({ each: true })
  // @Type(() => Question)
  // questions: Question[];
}
export class QuizUpdateDto {
  @IsDefined({ always: true })
  @IsNotEmpty()
  title: string;
}
class Question {
  @IsNotEmpty()
  name: string;

  @IsDefined({ always: true })
  @ValidateNested({ each: true })
  @Type(() => Mcq)
  mcqs: Mcq[];
}

class Mcq {
  @IsNotEmpty()
  name: string;

  isCorrect: boolean;
}
