import {
  BaseEntity,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['name'])
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'bigint' })
  year: number;

  @ApiProperty()
  @Column({ nullable: false, type: 'bigint' })
  stars: number;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 1024 })
  videoURL: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateAt: Date;
}
