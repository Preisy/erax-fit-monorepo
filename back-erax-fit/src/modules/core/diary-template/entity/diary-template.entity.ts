import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { SelfControlPropsEntity } from '../../self-control-props/entity/self-control-props.entity';

@Entity('diary-templates')
export class DiaryTemplateEntity extends AppBaseEntity {
  @ApiProperty({ type: () => SelfControlPropsEntity })
  @OneToMany(() => SelfControlPropsEntity, (props) => props.template, { cascade: true })
  public props: SelfControlPropsEntity[];
}
