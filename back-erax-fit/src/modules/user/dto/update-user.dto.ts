import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsStrongPassword } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

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

  constructor(id: number, email: string, password: string, firstName?: string, lastName?: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
