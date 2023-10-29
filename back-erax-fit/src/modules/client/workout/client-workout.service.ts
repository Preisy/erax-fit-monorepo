import { Injectable } from '@nestjs/common';
import { AppPagination } from 'src/utils/app-pagination.util';
import { BaseWorkoutService } from '../../core/workout/base-workout.service';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';

@Injectable()
export class ClientWorkoutService {
  constructor(private readonly baseService: BaseWorkoutService) {}

  async findAll(
    id: WorkoutEntity['userId'],
    query: AppPagination.Request,
  ): Promise<AppPagination.Response<WorkoutEntity>> {
    return this.baseService.findAll(query, {
      where: {
        userId: id,
      },
    });
  }
}
