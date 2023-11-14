import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { MealItemEntity } from './meal-item.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('nutrition')
export class NutritionEntity extends AppBaseEntity {
  @ApiProperty()
  @Column('varchar')
  public name: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column('integer', { name: 'userId' })
  public userId!: number;

  @OneToMany(() => MealItemEntity, (mealItem) => mealItem.nutrition, { cascade: true })
  public mealItems: MealItemEntity[];
}