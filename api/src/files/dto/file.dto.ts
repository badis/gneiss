/* eslint-disable indent */
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FileDto {
  @IsUUID()
  guid: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  mimetype: string;

  @IsNotEmpty()
  size: number;
}
