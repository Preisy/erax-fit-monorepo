import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { MealEntity } from '../../meal/entity/meal.entity';

@Entity('meal-items')
export class MealItemEntity extends AppBaseEntity {
  @ApiProperty()
  @Column('integer')
  public category: number;

  @ApiProperty()
  @Column('varchar')
  public type: string;

  @ApiProperty()
  @Column('integer')
  public quantity: number;

  @ApiProperty({ type: () => MealEntity })
  @ManyToOne(() => MealEntity, (meal) => meal.mealItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mealId' })
  public meal!: MealEntity;

  @ApiProperty()
  @Column('integer', { name: 'mealId' })
  public mealId!: number;
}
