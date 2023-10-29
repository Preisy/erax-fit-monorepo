import { ApiProperty, OmitType } from '@nestjs/swagger';
import { WorkoutEntity } from '../entity/workout.entity';

export class GetWorkoutResponse extends WorkoutEntity {
  @ApiProperty()
  public localeDate: string;
}
