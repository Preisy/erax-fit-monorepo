import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { TokenEntity } from '../../authentication/entities/token.entity';
import { Constants, UserRole } from '../../../constants/constants';
import { AppBaseEntity } from '../../../models/app-base-entity.entity';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';

@Entity('users')
export class UserEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  public firstName?: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  public lastName?: string;

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
  public workouts: WorkoutEntity[];
  @ApiProperty({ type: () => TokenEntity })
  @OneToOne(() => TokenEntity)
  @JoinColumn({ name: 'tokenId' })
  public token?: TokenEntity;

  @ApiProperty()
  @Column('integer', { name: 'tokenId', nullable: true })
  public tokenId?: number;
}
