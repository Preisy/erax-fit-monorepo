// import { ApiProperty } from '@nestjs/swagger';
// import { WorkoutEntity } from '../entities/workout.entity';
// import { GetWorkoutResponse } from './get-workout.dto';

// export class GetWorkoutsResponse {
//   @ApiProperty({ type: [WorkoutEntity] })
//   public workouts: GetWorkoutResponse[];

//   @ApiProperty()
//   public count: number;

//   constructor(workouts: WorkoutEntity[], count: number) {
//     this.workouts = new Array(workouts.length);
//     for (let i = 0; i < this.workouts.length; i++) this.workouts[i] = new GetWorkoutResponse(workouts[i]);
//     this.count = count;
//   }
// }
