import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsIn, IsOptional, IsString, IsStrongPassword, IsNumber, IsBoolean } from 'class-validator';
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
  public firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public lastName?: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  public age: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public height?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public weight?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public weightInYouth?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public nutritRestrict?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public allergy?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public gastroDeseases?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public mealIntolerance?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public insulinResistance?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public kidneyDesease?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public heartDesease?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public muscleDesease?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public loadRestrictions?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public sportsExp?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public goals?: string;

  constructor(
    email: string,
    password: string,
    age: number,
    firstName?: string,
    lastName?: string,
    height?: number,
    weight?: number,
    weigthInYouth?: number,
    nutritRestrict?: boolean,
    allergy?: boolean,
    gastroDeseases?: string,
    mealIntolerance?: string,
    insulinResistance?: boolean,
    kidneyDesease?: string,
    heartDesease?: boolean,
    muscleDesease?: string,
    loadRestrictions?: boolean,
    sportsExp?: string,
    goals?: string,
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.weightInYouth = weigthInYouth;
    this.nutritRestrict = nutritRestrict;
    this.allergy = allergy;
    this.gastroDeseases = gastroDeseases;
    this.mealIntolerance = mealIntolerance;
    this.insulinResistance = insulinResistance;
    this.kidneyDesease = kidneyDesease;
    this.heartDesease = heartDesease;
    this.muscleDesease = muscleDesease;
    this.loadRestrictions = loadRestrictions;
    this.sportsExp = sportsExp;
    this.goals = goals;
  }
}

export class CreateUserByAdminRequest {
  @IsDefined()
  @IsIn(Constants.UserRoleList.getList())
  @ApiProperty({
    example: `One value from [${Constants.UserRoleList.getList()}`,
  })
  public role: UserRole;

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
  public firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public lastName?: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  public age: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public height?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public weight?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public weightInYouth?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public nutritRestrict?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public allergy?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public gastroDeseases?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public mealIntolerance?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public insulinResistance?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public kidneyDesease?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public heartDesease?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public muscleDesease?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  public loadRestrictions?: boolean;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public sportsExp?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public goals?: string;

  constructor(
    email: string,
    password: string,
    age: number,
    firstName?: string,
    lastName?: string,
    height?: number,
    weight?: number,
    weigthInYouth?: number,
    nutritRestrict?: boolean,
    allergy?: boolean,
    gastroDeseases?: string,
    mealIntolerance?: string,
    insulinResistance?: boolean,
    kidneyDesease?: string,
    heartDesease?: boolean,
    muscleDesease?: string,
    loadRestrictions?: boolean,
    sportsExp?: string,
    goals?: string,
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.weightInYouth = weigthInYouth;
    this.nutritRestrict = nutritRestrict;
    this.allergy = allergy;
    this.gastroDeseases = gastroDeseases;
    this.mealIntolerance = mealIntolerance;
    this.insulinResistance = insulinResistance;
    this.kidneyDesease = kidneyDesease;
    this.heartDesease = heartDesease;
    this.muscleDesease = muscleDesease;
    this.loadRestrictions = loadRestrictions;
    this.sportsExp = sportsExp;
    this.goals = goals;
  }
}

export class CreateUserResponse {
  @ApiProperty({ type: UserEntity })
  public user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }
}
