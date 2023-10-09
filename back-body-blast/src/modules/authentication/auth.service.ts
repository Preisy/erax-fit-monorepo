import { Injectable } from '@nestjs/common';
import { AuthRequest, AuthResponse } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ExternalPayloadType } from './types/external-payload.type';
import { MainException } from '../../exceptions/main.exception';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async auth(request: AuthRequest): Promise<Tokens> {
    const newUser = (await this.userService.createUser(request)).user;

    if (!(await bcrypt.compare(request.password, newUser.password))) {
      throw MainException.unauthorized();
    }
    const tokens = await this.getTokens(newUser.id, newUser.getRtHash());
    await this.updateRefreshHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async login(request: AuthRequest): Promise<Tokens> {
    try {
      const { user } = await this.userService.getUserByEmail(request.email);
      const passwordMatches = await bcrypt.compare(request.password, user.password);

      if(!passwordMatches) throw MainException.forbidden('Access denied: invalid password');

      const tokens = await this.getTokens(user.id, user.getRtHash());
      await this.updateRefreshHash(user.id, tokens.refreshToken);

      return tokens;
    } catch {
      throw MainException.forbidden('Access denied');
    }
  }
  
  async logout(userId: number){
    const { user } = await this.userService.getUserById(userId);

    if(!user) throw MainException.entityNotFound('Not found');

    user.setRtHash(null);
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

    const refreshMatches = bcrypt.compare(refresh, user.getRtHash());
    if (!refreshMatches) throw MainException.forbidden('Failed to refresh access due to invalid refresh token');

    const tokens = await this.getTokens(user.id, user.getRtHash());
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
    user.setRtHash(hash);
  }

  async getMe(userId: number): Promise<UserEntity> {
    return (await this.userService.getUserById(userId)).user;
  }
}
