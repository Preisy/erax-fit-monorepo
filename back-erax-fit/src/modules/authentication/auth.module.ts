﻿import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUserModule } from '../core/user/base-user.module';
import { UserEntity } from '../core/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenEntity } from './entities/token.entity';
import { AccessStrategy } from './strategies/access-strategy';
import { RefreshStrategy } from './strategies/refresh-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity, UserEntity]),
    BaseUserModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [AuthService, AccessStrategy, RefreshStrategy, Repository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
