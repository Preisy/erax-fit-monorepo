import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Constants, UserRole } from '../../constants/constants';
import { Exclude } from 'class-transformer';
import { TokenEntity } from '../../authentication/entities/token.entity';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id!: number;

  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar', nullable: true })
  public firstName!: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  public lastName!: string;

  @Column({
    type: 'varchar',
    name: 'role',
    default: Constants.UserRoleList.default(),
  })
  @ApiProperty()
  public role!: UserRole;

  @ApiProperty()
  @Column({ name: 'email', type: 'varchar', unique: true })
  public email!: string;

  @ApiProperty()
  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: 128 })
  public password!: string;

  @ApiProperty()
  @OneToOne(() => TokenEntity, (token) => token.user)
  @JoinColumn()
  token: TokenEntity;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  public updatedAt!: Date;

  @ApiProperty()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  public deletedAt!: Date;

  @ApiProperty()
  @Column({ name: 'age', type: 'smallint' })
  public age: number;

  @ApiProperty()
  @Column({ name: 'height', type: 'float' })
  public height: number;

  @ApiProperty()
  @Column({ name: 'weight', type: 'float' })
  public weight: number;

  @ApiProperty()
  @Column({ name: 'weight_in_youth', type: 'float' })
  public weightInYouth: number;

  @ApiProperty()
  @Column({ name: 'nutrition_restrictions', type: 'boolean' })
  public nutritRestrict: boolean;

  @ApiProperty()
  @Column({ name: 'allergy', type: 'boolean' })
  public allergy: boolean;

  @ApiProperty()
  @Column({ name: 'gastro_deseases', type: 'varchar', length: 256 })
  public gastroDeseases: string;

  @ApiProperty()
  @Column({ name: 'meal_intolerance', type: 'varchar', length: 256 })
  public mealIntolerance: string;

  @ApiProperty()
  @Column({ name: 'insulin_resistance', type: 'boolean' })
  public insulinResistance: boolean;

  @ApiProperty()
  @Column({ name: 'kidney_desease', type: 'varchar', length: 128 })
  public kidneyDesease: string;

  @ApiProperty()
  @Column({ name: 'heart_desease', type: 'boolean' })
  public heartDesease: boolean;

  @ApiProperty()
  @Column({ name: 'muscle_desease', type: 'varchar', length: 128 })
  public muscleDesease: string;

  @ApiProperty()
  @Column({ name: 'load_restrictions', type: 'boolean' })
  public loadRestrictions: boolean;

  @ApiProperty()
  @Column({ name: 'sports_exp', type: 'varchar', length: 128 })
  public sportsExp: string;

  @ApiProperty()
  @Column({ name: 'goals', type: 'varchar', length: 256 })
  public goals: string;
}
