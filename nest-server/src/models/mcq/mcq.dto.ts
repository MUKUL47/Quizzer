import { IsDefined, IsNotEmpty } from 'class-validator';
export class McqCreateDto {
  @IsDefined({ always: true })
  @IsNotEmpty()
  name: string;

  isCorrect: boolean;
}
export class McqUpdateDto {
  @IsNotEmpty()
  name: string;

  isCorrect: boolean;
}
