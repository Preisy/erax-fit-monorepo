import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsNumber,
  IsBoolean,
  Length,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { Constants, UserRole } from '../../constants/constants';

export class CreateUserRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsDefined()
  @IsString()
  @IsStrongPassword(
    { minLength: 8, minNumbers: 1, minUppercase: 1, minSymbols: 0 },
    {
      message: 'Password must be min 8 symbols, 1 number and 1 uppercase symbol',
    },
  )
  @ApiProperty()
  public password: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Length(1, 50)
  public firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Length(1, 50)
  public lastName?: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  public age: number;

  @IsNumber()
  @ApiProperty()
  public height: number;

  @IsNumber()
  @ApiProperty()
  public weight: number;

  @IsNumber()
  @ApiProperty()
  public weightInYouth: number;

  @IsBoolean()
  @ApiProperty()
  public nutritRestrict: boolean;

  @IsBoolean()
  @ApiProperty()
  public allergy: boolean;

  @IsString()
  @ApiProperty()
  @Length(1, 300)
  public gastroDeseases: string;

  @IsString()
  @ApiProperty()
  @Length(1, 300)
  public mealIntolerance: string;

  @IsBoolean()
  @ApiProperty()
  public insulinResistance: boolean;

  @IsString()
  @ApiProperty()
  @Length(1, 300)
  public kidneyDesease: string;

  @IsBoolean()
  @ApiProperty()
  public heartDesease: boolean;

  @IsString()
  @ApiProperty()
  @Length(1, 300)
  public muscleDesease: string;

  @IsBoolean()
  @ApiProperty()
  public loadRestrictions: boolean;

  @IsString()
  @ApiProperty()
  @Length(1, 300)
  public sportsExp: string;

  @IsString()
  @ApiProperty()
  @Length(1, 300)
  public goals: string;
}

export class CreateUserByAdminRequest extends CreateUserRequest {
  @IsDefined()
  @IsIn(Constants.UserRoleList.getList())
  @ApiProperty({
    example: `One value from [${Constants.UserRoleList.getList()}`,
  })
  public role: UserRole;
}

export class CreateUserResponse {
  @ApiProperty({ type: UserEntity })
  public user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }
}
