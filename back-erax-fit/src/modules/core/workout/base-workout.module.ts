import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { Repository } from 'typeorm';
import { BaseWorkoutService } from './base-workout.service';
import { ExerciseEntity } from '../exerсise/entities/exercise.entity';
import { UserEntity } from '../user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]), forwardRef(() => AuthModule)],
  exports: [BaseWorkoutService],
  providers: [BaseWorkoutService, Repository],
})
export class BaseWorkoutModule {}
