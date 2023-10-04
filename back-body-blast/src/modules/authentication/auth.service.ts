import { Injectable } from '@nestjs/common';
import { AuthRequest, AuthResponse } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ExternalPayloadType } from './types/external-payload.type';
import { MainException } from '../../exceptions/main.exception';
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
    const { user } = await this.userService.getUserByEmail(request.email);

    if (!(await bcrypt.compare(request.password, user.password))) {
      throw MainException.unauthorized();
    }
    const payload = { sub: user.id, userEmail: user.email };
    return new AuthResponse(await this.jwtService.signAsync(payload));
  }

  async login(jwt: string) {
    try {
      const decodedToken: ExternalPayloadType = <ExternalPayloadType>(
        this.jwtService.verify(jwt)
      );

      if (!decodedToken || !decodedToken?.userEmail)
        throw MainException.invalidData('Некорректный токен');
      
      const user = await this.userService.getUserByEmail(decodedToken.userEmail);
      const accessToken = this.jwtService.sign(decodedToken);
      const refreshToken = this.jwtService.sign(decodedToken, {expiresIn: '7d'});

      return {
        user,
        accessToken,
        refreshToken
      }
    } catch {
      throw MainException.forbidden('Нет доступа');
    }
  }

  async refresh(refreshToken: string){
    try {
      const decodedToken: ExternalPayloadType = <ExternalPayloadType>(
        this.jwtService.verify(refreshToken)
      );

      if (!decodedToken || !decodedToken?.userEmail)
        throw MainException.invalidData('Некорректный токен');
      
      const accessToken = this.jwtService.sign(decodedToken);

      return {
        accessToken
      }
    } catch {
      throw MainException.forbidden('Нет доступа');
    }
  }


  async getMe(userId: number): Promise<UserEntity> {
    return (await this.userService.getUserById(userId)).user;
  }
}
