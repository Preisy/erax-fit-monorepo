import { ApiProperty, OmitType } from '@nestjs/swagger';
import { WorkoutEntity } from '../entities/workout.entity';

export class GetWorkoutResponse extends WorkoutEntity {
  @ApiProperty()
  public localeDate: string;
}
