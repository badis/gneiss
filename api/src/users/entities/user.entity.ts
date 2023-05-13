/* eslint-disable indent */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text', { nullable: true })
  hashed_refresh_token: string;

  @Column('text', { default: 'need_approval' })
  status: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
