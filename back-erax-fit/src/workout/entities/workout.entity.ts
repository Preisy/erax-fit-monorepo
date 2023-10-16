import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AppBaseEntity } from 'src/models/app-base-entity.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';

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

  @ManyToOne(() => UserEntity, (user) => user.workouts)
  user: UserEntity;

  @OneToMany(() => ExerciseEntity, (exercise) => exercise.workout)
    exercises: ExerciseEntity[];
  
}
