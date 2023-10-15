﻿import {
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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequest, AuthResponse } from './dto/auth.dto';
import { MainExceptionFilter } from '../exceptions/main-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RequestWithUser } from './types/requestWithUser.type';
import { BaseAuthGuard } from './guards/baseAuth.guard';
import { AuthGuard } from '@nestjs/passport';
import { GetMeResponse } from './dto/getMe.dto';

@Controller('auth')
@ApiTags('Аутентификация')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle(5, 1)
  @Post('signup')
  @ApiResponse({
    status: 201,
    type: AuthResponse
  })
  async auth(@Body() req: AuthRequest) {
    return this.authService.auth(req);
  }
  @Throttle(5, 1)
  @Post('login')
  @ApiResponse({
    status: 200,
    type: AuthResponse
  })
  async login(@Body() req: AuthRequest){
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Throttle(5, 1)
  @Post('logout')
  @ApiResponse({
    status: 200,
    type: AuthResponse 
  })
  async logout(@Req() req: RequestWithUser){
    return this.authService.logout(req.user.id);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Throttle(5, 1)
  @Post('refresh')
  @ApiResponse({
    status: 200,
    type: AuthResponse
  })
  async refreshTokens(@Req() req: RequestWithUser){
    return this.authService.refreshTokens(req.user.id, req.user.rtHash);
  }

  @Get('me')
  @ApiResponse({
    status: 200,
    type: GetMeResponse
  })  
  @BaseAuthGuard()
  async getMe(@Req() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }
}