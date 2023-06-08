/* eslint-disable indent */
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ProfileDto {
  @IsNotEmpty()
  user_id: number;

  @IsUUID()
  guid: string;

  @IsUUID()
  picture: string;

  @IsUUID()
  banner: string;
}
