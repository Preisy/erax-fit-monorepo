import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { SelfControlPropsEntity } from '../../self-control-props/entity/self-control-props.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { DiaryTemplateEntity } from '../../diary-template/entity/diary-template.entity';

@Entity('self-control')
export class SelfControlEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public behavior: string;

  @ApiProperty()
  @Column()
  public date: Date;

  @ApiProperty({ nullable: true })
  @Column()
  public sum?: number;

  @ApiProperty({ nullable: true })
  @Column()
  public activity?: string;

  @ApiProperty({ nullable: true })
  @Column()
  public steps?: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column('integer', { name: 'userId' })
  public userId!: number;

  @ApiProperty({ type: () => DiaryTemplateEntity })
  @ManyToOne(() => DiaryTemplateEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'templateId' })
  public template!: DiaryTemplateEntity;

  @ApiProperty()
  @Column('integer', { name: 'templateId' })
  public templateId!: number;

  @ApiProperty({ type: () => SelfControlPropsEntity })
  public props: SelfControlPropsEntity[];
}
