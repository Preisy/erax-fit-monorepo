import { Injectable } from '@nestjs/common';
import { AppPagination } from 'src/utils/app-pagination.util';
import { BaseWorkoutService } from '../../core/workout/base-workout.service';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';
import { BaseNutritionService } from 'src/modules/core/nutrition/base-nutrition.service';
import { NutritionEntity } from 'src/modules/core/nutrition/entity/nutrition.entity';

@Injectable()
export class ClientNutritionService {
  constructor(private readonly baseService: BaseNutritionService) {}

  async findAll(
    userId: WorkoutEntity['userId'],
    query: AppPagination.Request,
  ): Promise<AppPagination.Response<NutritionEntity>> {
    return this.baseService.findAll(query, {
      where: {
        userId,
      },
    });
  }
}
