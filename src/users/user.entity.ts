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
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 20 })
  role: string;

  @ApiProperty()
  @Column({ nullable: false, default: true })
  status: boolean;

  @ApiProperty()
  @Column({ nullable: false })
  password: string;

  @ApiProperty()
  @Column({ nullable: false })
  salt: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar', length: 64 })
  confirmationToken: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
