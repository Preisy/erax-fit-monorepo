import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { MealEntity } from '../../meal/entity/meal.entity';

@Entity('nutrition')
export class NutritionEntity extends AppBaseEntity {
  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column('integer', { name: 'userId' })
  public userId!: number;

  @OneToMany(() => MealEntity, (meal) => meal.nutrition, { cascade: true })
  public meals: MealEntity[];
}
