import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Constants, UserRole } from '../../constants/constants';
import { Exclude } from 'class-transformer';

@Entity({name: 'users', schema: 'public'})
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id!: number;

  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  public firstName!: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  public lastName!: string;

  @Column({
    type: 'varchar',
    name: 'role',
    default: Constants.UserRoleList.default(),
  })
  @ApiProperty()
  public role!: UserRole;

  @ApiProperty()
  @Column({ name: 'email', type: 'varchar', unique: true })
  public email!: string;

  @ApiProperty()
  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: 128 })
  public password!: string;

  @ApiProperty()
  @Column({ name: 'hash', type: 'varchar', length: 256, nullable: true})
  private hash: string;

  @ApiProperty()
  @Column({ name: 'rt_hash', type: 'varchar', length: 256, nullable: true})
  private rtHash: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt!: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  public deletedAt!: Date;

  public setRtHash(hash: string){
    this.rtHash = hash;
  }

  public getRtHash(): string{
    return this.rtHash
  }
}