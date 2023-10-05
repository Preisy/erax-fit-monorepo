import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequest, AuthResponse } from './dto/auth.dto';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { GetMeResponse } from './dto/getMe.dto';
import { RequestWithUser } from './types/requestWithUser.type';
import { BaseAuthGuard } from './guards/baseAuth.guard';
import { RefreshJwtGuard } from './guards/refreshJwt.guard';

@Controller('auth')
@ApiTags('Аутентификация')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async auth(@Body() body: AuthRequest) {
    return this.authService.auth(body);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() req: AuthRequest){
    return this.authService.login(req);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @BaseAuthGuard()
  async getMe(@Req() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }
}
