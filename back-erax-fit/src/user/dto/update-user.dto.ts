import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { TokenEntity } from '../../authentication/entities/token.entity';

export class UpdateUserRequest {
  public id: number;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiPropertyOptional()
  public email?: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword({ minLength: 8, minNumbers: 1, minUppercase: 1 })
  @ApiPropertyOptional()
  public password?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public firstName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public lastName?: string;

  @ApiProperty()
  public token?: TokenEntity;

  constructor(id: number, email: string, password: string, firstName?: string, lastName?: string, token?: TokenEntity) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.token = token;
  }
}

export class UpdateUserResponse {
  @ApiProperty({ type: UserEntity })
  public user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }
}
