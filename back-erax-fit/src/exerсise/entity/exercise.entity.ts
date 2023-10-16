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

@Entity('exercises')
export class WorkoutEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id!: number;

  @ApiProperty()
  @Column({ name: 'name', nullable: false })
  public name!: string;
  @ApiProperty()
  @Column({ name: 'coach_comment', nullable: true })
  public coachComment!: string;

  @ApiProperty()
  @Column({ name: 'weight', nullable: true })
  public weight!: number;

  @ApiProperty()
  @Column({ name: 'sets', nullable: false })
  public sets!: number;

  @ApiProperty()
  @Column({ name: 'repetitions', nullable: false })
  public repetitions!: number;

  @ApiProperty()
  @Column({ name: 'rest_time', nullable: false })
  public restTime!: string;

  @ApiProperty()
  @Column({ name: 'pace', nullable: false })
  public pace!: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt!: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  public deletedAt!: Date;
}
