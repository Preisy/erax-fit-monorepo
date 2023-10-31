import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';

@Entity('prompts')
export class PromptEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public type: string;

  @ApiProperty()
  @Column()
  public photoLink: string;

  @ApiProperty()
  @Column()
  public videoLink: string;
}
