import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workouts')
export class FileEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ApiProperty()
  @Column({ name: 'filename', nullable: false })
  public fileName!: string;

  @ApiProperty()
  @Column({ name: 'path', nullable: true })
  public path!: string;
}
