import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsIn, IsOptional, IsString, IsStrongPassword } from 'class-validator';
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

  constructor(email: string, password: string, firstName?: string, lastName?: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
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

  constructor(email: string, password: string, firstName?: string, lastName?: string) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

export class CreateUserResponse {
  @ApiProperty({ type: UserEntity })
  public user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }
}
