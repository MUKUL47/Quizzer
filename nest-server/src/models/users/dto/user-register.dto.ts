import { IsNotEmpty } from 'class-validator';

export default class UserRegisterDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
