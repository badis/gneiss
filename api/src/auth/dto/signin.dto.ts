/* eslint-disable indent */
import { IsNotEmpty, MinLength } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
