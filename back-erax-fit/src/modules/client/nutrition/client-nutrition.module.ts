import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { MealItemEntity } from 'src/modules/core/meal-item/entity/meal-item.entity';
import { MealEntity } from 'src/modules/core/meal/entity/meal.entity';
import { BaseNutritionModule } from 'src/modules/core/nutrition/base-nutrition.module';
import { NutritionEntity } from 'src/modules/core/nutrition/entity/nutrition.entity';
import { ClientNutritionController } from './client-nutrition.controller';
import { ClientNutritionService } from './client-nutrition.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([NutritionEntity, MealEntity, MealItemEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseNutritionModule),
  ],
  providers: [ClientNutritionService],
  controllers: [ClientNutritionController],
})
export class ClientNutritionModule {}
