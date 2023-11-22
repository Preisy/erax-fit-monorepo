import { ApiProperty } from '@nestjs/swagger';
import { TokenEntity } from '../entities/token.entity';
import { IsNumber, IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateTokenRequest {
  @IsNumber()
  public id: number;

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty()
  public email?: string;

  @ApiProperty()
  public token?: TokenEntity;

  constructor(id: number, email: string, token: TokenEntity) {
    this.id = id;
    this.email = email;
    this.token = token;
  }
}

export class UpdateRefreshAccess {
  @IsString()
  @ApiProperty()
  public refreshToken: string;

  @IsString()
  @ApiProperty()
  public accessToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
