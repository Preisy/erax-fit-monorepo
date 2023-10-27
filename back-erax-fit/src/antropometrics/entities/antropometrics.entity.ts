import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { AppBaseEntity } from '../../models/app-base-entity.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('forms')
export class AntropometricsEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'float' })
  public weight: number;

  @ApiProperty()
  @Column({ type: 'float' })
  public waist: number;

  @ApiProperty({ type: 'float' })
  public abdomen: number;

  @ApiProperty({ type: 'float' })
  public shoulder: number;

  @ApiProperty({ type: 'float' })
  public hip: number;

  @ApiProperty({ type: 'float' })
  public hipVolume: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;
}
