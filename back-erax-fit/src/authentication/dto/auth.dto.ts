﻿import { ApiProperty } from '@nestjs/swagger';
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

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
