import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { Constants, UserRole } from '../../constants/constants';
import { Exclude } from 'class-transformer';
import { AppBaseEntity } from '../../models/app-base-entity.entity';
import { WorkoutEntity } from '../../workout/entities/workout.entity';

@Entity('users')
export class UserEntity extends AppBaseEntity{

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

  @OneToMany(() => WorkoutEntity, (workout) => workout.user)
    workouts: WorkoutEntity[];
    
}
