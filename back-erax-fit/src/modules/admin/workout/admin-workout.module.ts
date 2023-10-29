import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { ExerciseEntity } from 'src/modules/core/exerсise/entities/exercise.entity';
import { BaseWorkoutModule } from 'src/modules/core/workout/base-workout.module';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AdminWorkoutController } from './admin-workout.controller';
import { AdminWorkoutService } from './admin-workout.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseWorkoutModule),
  ],
  providers: [AdminWorkoutService, Repository],
  controllers: [AdminWorkoutController],
})
export class AdminWorkoutModule {}
