import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { NutritionEntity } from '../../nutrition/entity/nutrition.entity';
import { MealItemEntity } from '../../meal-item/entity/meal-item.entity';

@Entity('meals')
export class MealEntity extends AppBaseEntity {
  @ApiProperty()
  @Column('varchar')
  public name: string;

  @ApiProperty({ type: () => NutritionEntity })
  @ManyToOne(() => NutritionEntity, (nutrition) => nutrition.meals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nutritionId' })
  public nutrition!: NutritionEntity;

  @ApiProperty()
  @Column('integer', { name: 'nutritionId' })
  public nutritionId!: number;

  @OneToMany(() => MealItemEntity, (mealItem) => mealItem.meal, { cascade: true })
  public mealItems: MealItemEntity[];
}
