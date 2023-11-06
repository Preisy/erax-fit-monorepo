import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { MealItemEntity } from '../meal-item/entity/meal-item.entity';
import { MealEntity } from '../meal/entity/meal.entity';
import { UserEntity } from '../user/entities/user.entity';
import { BaseNutritionService } from './base-nutrition.service';
import { NutritionEntity } from './entity/nutrition.entity';
@Module({
  imports: [TypeOrmModule.forFeature([NutritionEntity, MealEntity, MealItemEntity]), forwardRef(() => AuthModule)],
  exports: [BaseNutritionService],
  providers: [BaseNutritionService],
})
export class BaseNutritionModule {}
