import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { DiaryTemplateEntity } from '../../diary-template/entity/diary-template.entity';

@Entity('self-control-props')
export class SelfControlPropsEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column({ nullable: true })
  public value?: number;

  @ApiProperty({ type: () => DiaryTemplateEntity })
  @ManyToOne(() => DiaryTemplateEntity, (template) => template.props, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'templateId' })
  public template!: DiaryTemplateEntity;

  @ApiProperty()
  @Column('integer', { name: 'templateId' })
  public templateId!: number;
}
