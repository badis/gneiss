/* eslint-disable indent */
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
