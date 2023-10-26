import { Module, forwardRef } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutEntity, UserEntity, ExerciseEntity]), forwardRef(() => AuthModule)],
  providers: [WorkoutService, Repository],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
