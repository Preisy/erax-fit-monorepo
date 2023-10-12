﻿import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AccessStrategy } from './strategies/access-strategy';
import { RefreshStrategy } from './strategies/refresh-strategy';
import { Repository } from 'typeorm';

@Module({
  imports: [
    forwardRef(() => UserModule),
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '100d' },
    }),
  ],
  providers: [AuthService, AccessStrategy, RefreshStrategy, Repository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}