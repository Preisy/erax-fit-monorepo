import { Injectable } from '@nestjs/common';
import { AuthRequest, AuthResponse } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ExternalPayloadType } from './types/external-payload.type';
import { MainException } from '../../exceptions/main.exception';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(request: AuthRequest): Promise<Tokens> {
    const { user } = await this.userService.getUserByEmail(request.email);

    if (!(await bcrypt.compare(request.password, user.password))) {
      throw MainException.unauthorized();
    }
    
    return (await this.getTokens(user.id, user.email));
  }

  async login(request: AuthRequest): Promise<Tokens> {
    try {
      
      const { user } = await this.userService.getUserByEmail(request.email);
      const tokens = await this.getTokens(user.id, user.email)

      const passwordMatches = await bcrypt.compare(request.password, user.password);

      if(!passwordMatches) throw MainException.forbidden('Access denied: invalid password');
      
      return tokens;
    } catch {
      throw MainException.forbidden('Access denied');
    }
  }

  async getTokens(userId: number, email: string): Promise<Tokens>{
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

    const refreshMatches = bcrypt.compare(refresh, user.email);
    if (!refreshMatches) throw MainException.forbidden('Failed to refresh access due to invalid refresh token');

    return (await this.getTokens(user.id, user.email));
  }

  async getMe(userId: number): Promise<UserEntity> {
    return (await this.userService.getUserById(userId)).user;
  }
}
