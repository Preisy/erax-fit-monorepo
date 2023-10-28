import { ApiProperty } from '@nestjs/swagger';
import { ExerciseEntity } from '../entities/exercise.entity';

export class GetExerciseResponse {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public weight: number;

  @ApiProperty()
  public sets?: number;

  @ApiProperty()
  public repetitions: number;

  @ApiProperty()
  public restTime: number;

  @ApiProperty()
  public pace: string;

  @ApiProperty()
  public photoLink: string;

  @ApiProperty()
  public videoLink: string;

  @ApiProperty()
  public trainerComment: string;

  constructor(exercise: ExerciseEntity) {
    this.name = exercise.name;
    this.weight = exercise.weight;
    this.sets = exercise.sets;
    this.repetitions = exercise.repetitions;
    this.restTime = exercise.restTime;
    this.pace = exercise.pace;
    this.photoLink = exercise.photoLink;
    this.videoLink = exercise.videoLink;
    this.trainerComment = exercise.trainerComment;
  }
}
