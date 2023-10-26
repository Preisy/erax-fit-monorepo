import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumberString, IsOptional } from 'class-validator';
import { WorkoutEntity } from '../entities/workout.entity';
import { GetWorkoutResponse } from './get-workout.dto';

export class GetWorkoutsRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  public expanded?: boolean;

  constructor(page?: number, limit?: number, expanded = false) {
    this.page = page;
    this.limit = limit;
    this.expanded = expanded;
  }
}

export class GetWorkoutsResponse {
  @ApiProperty({ type: [WorkoutEntity] })
  public workouts: GetWorkoutResponse[];

  @ApiProperty()
  public count: number;

  constructor(workouts: WorkoutEntity[], count: number) {
    this.workouts = new Array(workouts.length);
    //console.log(this.workouts);
    for (let i = 0; i < this.workouts.length; i++) this.workouts[i] = new GetWorkoutResponse(workouts[i]);
    this.count = count;
  }
}
