import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  login: string;

  @Column({ select: false })
  password: string;

  @Column()
  @ApiProperty()
  version: number;

  @Column()
  @ApiProperty()
  createdAt: number;

  @Column()
  @ApiProperty()
  updatedAt: number;
}
