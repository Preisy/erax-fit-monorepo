﻿import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumberString, IsOptional } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class GetUsersRequest {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  public limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  public expanded?: boolean;

  constructor(expanded = false, page?: number, limit?: number) {
    this.page = page;
    this.limit = limit;
    this.expanded = expanded;
  }
}

export class GetUsersResponse {
  @ApiProperty({ type: [UserEntity] })
  public users: UserEntity[];

  @ApiProperty()
  public count: number;

  constructor(users: UserEntity[], count: number) {
    this.users = users;
    this.count = count;
  }
}
