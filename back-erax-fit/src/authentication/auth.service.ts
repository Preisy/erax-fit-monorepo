﻿import { Injectable } from '@nestjs/common';
import { AuthRequest, AuthResponse } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MainException } from '../exceptions/main.exception';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(request: AuthRequest): Promise<AuthResponse> {
    const { user: newUser } = await this.userService.createUser(request);

    if (!(await bcrypt.compare(request.password, newUser.password))) {
      throw MainException.unauthorized();
    }
    const tokens = await this.getTokens(newUser.id, newUser.rtHash);
    await this.updateRefreshHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async login(request: AuthRequest): Promise<AuthResponse> {
    try {
      const { user } = await this.userService.getUserByEmail(request.email);
      const passwordMatches = await bcrypt.compare(request.password, user.password);

      if(!passwordMatches) throw MainException.forbidden('Access denied: invalid password');

      const tokens = await this.getTokens(user.id, user.rtHash);
      await this.updateRefreshHash(user.id, tokens.refreshToken);

      return tokens;
    } catch {
      throw MainException.forbidden('Access denied');
    }
  }
  
  async logout(userId: number){
    const { user } = await this.userService.getUserById(userId);

    if(!user) throw MainException.entityNotFound(`User with such id ${userId} not found`);
    if (user.rtHash !== null) user.rtHash = null;

    this.userService.updateUser(user);
  }

  async getTokens(userId: number, email: string): Promise<AuthResponse>{
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: 'access-secret',
          expiresIn: '15m'
        },

      ),
    this.jwtService.signAsync(
      {
 sub: userId,
 email
      },
      {
        secret: 'refresh-secret',
        expiresIn: '7d'
      },
    ),
      
    ]);
    return{
      accessToken: access,
      refreshToken: refresh,
    }
  }

  async refreshTokens(userId: number, refresh: string){
    const { user } = await this.userService.getUserById(userId);
    if(!user) throw MainException.forbidden('Acces denied');

    const refreshMatches = bcrypt.compare(refresh, user.rtHash);
    if (!refreshMatches) throw MainException.forbidden('Failed to refresh access due to invalid refresh token');

    const tokens = await this.getTokens(user.id, user.rtHash);
    await this.updateRefreshHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async hashData(data: string){
    return (bcrypt.hash(data, 10));
  }

  async updateRefreshHash(userId: number, refresh: string){
    const { user } = await this.userService.getUserById(userId);

    if(!user) throw MainException.forbidden('Failed to update rt due to invalid user')

    const hash = await this.hashData(refresh);
    user.rtHash = hash;
  }

  async getMe(userId: number): Promise<UserEntity> {
    return (await this.userService.getUserById(userId)).user;
  }
}