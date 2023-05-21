/* eslint-disable indent */
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user_password_reset_token')
@Unique(['user_id'])
export class PasswordResetToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  user_id: number;

  @Column('text')
  hashed_reset_token: string;

  @Column({ type: 'timestamptz' })
  expires_at: Date;
}
