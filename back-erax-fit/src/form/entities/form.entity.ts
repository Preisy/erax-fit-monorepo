import { ApiProperty } from "@nestjs/swagger";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('forms')
export class FormEntity{
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id!: number; 
    
  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.form)
    user: UserEntity;
    
  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt!: Date;

  @ApiProperty()
  @Column({name: 'weight', type: 'float'})
  public weight: number;

  @ApiProperty()
  @Column({name: 'waist', type: 'float'})
  public waist: number;

  @ApiProperty({name: 'abdomen', type: 'float'})
  public abdomen: number;

  @ApiProperty({name: 'shoulder', type: 'float'})
  public shoulder: number;

  @ApiProperty({name: 'hip', type: 'float'})
  public hip: number;
  
  @ApiProperty({name: 'hip_volume', type: 'float'})
  public hipVolume: number;

}