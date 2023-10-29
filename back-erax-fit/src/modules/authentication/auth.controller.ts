import { Body, Controller, Get, Post, Req, UseFilters, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { AppResponses } from '../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { AuthService } from './auth.service';
import { AuthRequest, AuthResponse } from './dto/auth.dto';
import { GetMeResponse } from './dto/getMe.dto';
import { BaseAuthGuard } from './guards/baseAuth.guard';
import { RequestWithUser } from './types/requestWithUser.type';

@Controller('auth')
@ApiTags('Аутентификация')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Throttle(5, 1)
  @Post('signup')
  @AppResponses({ status: 201, type: AppSingleResponse.type(AuthResponse) })
  async auth(@Body() req: AuthRequest) {
    return this.authService.auth(req);
  }

  @Throttle(5, 1)
  @Post('login')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AuthResponse) })
  async login(@Body() req: AuthRequest) {
    return this.authService.login(req);
  }

  @BaseAuthGuard()
  @Throttle(5, 1)
  @Post('logout')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async logout(@Req() req: RequestWithUser) {
    return this.authService.logout(req.user.email);
  }

  @BaseAuthGuard()
  @Throttle(5, 1)
  @Post('refresh')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AuthResponse) })
  async refreshTokens(@Body() req: RequestWithUser) {
    return this.authService.refreshTokens(req.user.id, req.user.token!.refreshHash);
  }

  @Get('me')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetMeResponse) })
  @BaseAuthGuard()
  async getMe(@Req() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }
}
