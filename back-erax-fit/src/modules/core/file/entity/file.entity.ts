import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';

@Entity('files')
export class FileEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public fileName: string;

  @ApiProperty()
  @Column()
  public path: string;

  @ApiProperty()
  @Column()
  public fileLInk: string;
}
