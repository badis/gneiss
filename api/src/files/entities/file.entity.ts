/* eslint-disable indent */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('file')
export class TFile {
  @PrimaryColumn('integer')
  id: number;

  @Column('uuid')
  guid: string;

  @Column('integer')
  user_id: number;

  @Column('text')
  filename: string;

  @Column('text')
  key: string;

  @Column('text')
  mimetype: string;

  @Column('integer')
  size: number;

  @Column('timestamptz')
  created_at: Date;
}
