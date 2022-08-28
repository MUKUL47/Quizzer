import { IsDefined, IsNotEmpty } from 'class-validator';
export class QuestionCreateDto {
  @IsDefined({ always: true })
  @IsNotEmpty()
  name: string;
}
export class QuestionUpdateDto {
  @IsDefined({ always: true })
  @IsNotEmpty()
  name: string;
}
// class Question {
//   @IsNotEmpty()
//   name: string;

//   @IsDefined({ always: true })
//   @ValidateNested({ each: true })
//   @Type(() => Mcq)
//   mcqs: Mcq[];
// }

// class Mcq {
//   @IsNotEmpty()
//   name: string;

//   isCorrect: boolean;
// }
