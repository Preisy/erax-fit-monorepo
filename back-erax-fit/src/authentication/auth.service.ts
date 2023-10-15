﻿import { Injectable } from '@nestjs/common';
import { AuthRequest, AuthResponse, LogoutResponse } from './dto/auth.dto';
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
    const tokens = await this.getTokens(newUser.id, newUser.token.refreshHash);
    await this.updateRefreshHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async login(request: AuthRequest): Promise<AuthResponse> {
    const { user } = await this.userService.getUserByEmail(request.email.toLocaleLowerCase());
    const passwordMatches = await bcrypt.compare(request.password, user.password);

    if(!passwordMatches) throw MainException.forbidden(`Error: no password mathces for user ${user.id}`);

    const tokens = await this.getTokens(user.id, user.token.refreshHash);
    await this.updateRefreshHash(user.id, tokens.refreshToken);

    return tokens;
    
  }
  
  async logout(userId: number): Promise<LogoutResponse> {
    const { user } = await this.userService.getUserById(userId);

    if(!user) throw MainException.entityNotFound(`User with such id ${userId} not found`);
    if (user.token.refreshHash !== null) user.token.refreshHash = null;

    this.userService.updateUser(user);

    return new LogoutResponse(true);
  }

  async getTokens(userId: number, email: string): Promise<AuthResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env['JWT_ACCESS_SECRET'], expiresIn: process.env['JWT_ACCESS_EXPIRATION'] },

      ),

      this.jwtService.signAsync(
        { sub: userId,email },
        { secret: process.env['JWT_REFRESH_SECRET'], expiresIn: process.env['JWT_REFRESH_EXPIRATION'] },
      ),
  
    ]);
    return new AuthResponse(accessToken, refreshToken);
  }

  async refreshTokens(userId: number, refresh: string): Promise<AuthResponse> {
    const { user } = await this.userService.getUserById(userId);

    const refreshMatches = bcrypt.compare(refresh, user.token.refreshHash);
    if (!refreshMatches) throw MainException.forbidden(`Failed to refresh access: current tokens for user ${userId} doesn't match`);

    const tokens = await this.getTokens(user.id, user.token.refreshHash);
    await this.updateRefreshHash(user.id, tokens.refreshToken);
    
    return tokens;
  }

  async hashData(data: string){
    return (bcrypt.hash(data, 10));
  }

  async updateRefreshHash(userId: number, refresh: string) {
    const { user } = await this.userService.getUserById(userId);

    if(!user) throw MainException.forbidden(`Error: cannot update token for user ${userId}`);

    const hash = await this.hashData(refresh);
    user.token.refreshHash = hash;

    this.userService.updateUser(user);
  }

  async getMe(userId: number): Promise<UserEntity> {
    return (await this.userService.getUserById(userId)).user;
  }
}