import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../models/app-base-entity.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ExerciseEntity } from '../../exerсise/entities/exercise.entity';

@Entity('workouts')
export class WorkoutEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ name: 'name', nullable: false })
  public name!: string;

  @ApiProperty()
  @Column({ name: 'comment', nullable: true })
  public comment!: string;

  @ApiProperty()
  @Column({ name: 'date', nullable: false })
  public date!: Date;

  @ApiProperty()
  @Column({ name: 'loop', nullable: true })
  public loop!: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column('integer', { name: 'userId' })
  public userId!: number;

  @OneToMany(() => ExerciseEntity, (exercise) => exercise.workout, { cascade: true })
  exercises: ExerciseEntity[];
}
