import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { AppBaseEntity } from 'src/models/app-base-entity.entity';
import { WorkoutEntity } from 'src/workout/entity/workout.entity';

@Entity('exercises')
export class ExerciseEntity extends AppBaseEntity {

  @ApiProperty()
  @Column({ name: 'name', nullable: false })
  public name!: string;

  @ApiProperty()
  @Column({ name: 'trainer_comment', nullable: true })
  public trainerComment!: string;

  @ApiProperty()
  @Column({ name: 'weight', nullable: false })
  public weight!: number;

  @ApiProperty()
  @Column({ name: 'sets', nullable: false })
  public sets!: number;

  @ApiProperty()
  @Column({ name: 'repetitions', nullable: false })
  public repetitions!: number;

  @ApiProperty()
  @Column({ name: 'rest_time', nullable: false })
  public restTime!: number;

  @ApiProperty()
  @Column({ name: 'pace', nullable: false })
  public pace!: string;

  @ApiProperty()
  @Column({ name: 'photo_link', nullable: false })
  public photoLink!: string;

  @ApiProperty()
  @Column({ name: 'video_link', nullable: false })
  public videoLink!: string;

  @ManyToOne(() => WorkoutEntity, (workout) => workout.exercises)
  workout: WorkoutEntity;
  
}
