/* eslint-disable indent */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('profile')
export class Profile {
  @PrimaryColumn('integer')
  user_id: number;

  @Column('uuid')
  guid: string;

  @Column('uuid')
  picture: string;

  @Column('uuid')
  banner: string;
}
