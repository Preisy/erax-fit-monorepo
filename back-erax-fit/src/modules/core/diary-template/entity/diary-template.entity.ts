import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { SelfControlPropsEntity } from '../../self-control-props/entity/self-control-props.entity';

@Entity('diary-templates')
export class DiaryTemplateEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public stepsGoal: number;

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column('integer', { name: 'userId' })
  public userId!: number;

  @ApiProperty({ type: () => SelfControlPropsEntity })
  @OneToMany(() => SelfControlPropsEntity, (props) => props.template, { cascade: true })
  public props: SelfControlPropsEntity[];
}
