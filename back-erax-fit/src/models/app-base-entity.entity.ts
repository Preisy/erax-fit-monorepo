import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AppBaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public readonly createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt!: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  public deletedAt!: Date;
}
