import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { Repository } from 'typeorm';
import { BaseWorkoutService } from './base-workout.service';
import { ExerciseEntity } from '../exerсise/entities/exercise.entity';
@Module({
  imports: [TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]), forwardRef(() => AuthModule)],
  exports: [BaseWorkoutService],
  providers: [BaseWorkoutService, Repository],
})
export class BaseWorkoutModule {}
