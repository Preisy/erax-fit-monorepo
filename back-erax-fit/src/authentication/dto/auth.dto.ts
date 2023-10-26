import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class AuthRequest {
  @ApiProperty()
  @IsDefined({ message: 'email is required' })
  @IsEmail()
  @IsString()
  public email: string;

  @ApiProperty()
  @IsDefined({ message: 'password is required' })
  @IsString()
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class AuthResponse {
  @ApiProperty()
  public accessToken: string;

  @ApiProperty()
  public refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export class LogoutRequest {
  @ApiProperty()
  @IsDefined({ message: 'email is required' })
  @IsEmail()
  @IsString()
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export class LogoutResponse {
  @ApiProperty()
  public logOutSuccess: boolean;

  constructor(logOutSuccess: boolean) {
    this.logOutSuccess = logOutSuccess;
  }
}
