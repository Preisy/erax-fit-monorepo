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
import { ApiTags } from '@nestjs/swagger';
import { AuthRequest } from './dto/auth.dto';
import { MainExceptionFilter } from '../exceptions/main-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RequestWithUser } from './types/requestWithUser.type';
import { BaseAuthGuard } from './guards/baseAuth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Аутентификация')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async auth(@Body() req: AuthRequest) {
    return this.authService.auth(req);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() req: AuthRequest){
    return this.authService.login(req);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: RequestWithUser){
    return this.authService.logout(req.user.id);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req: RequestWithUser){
    return this.authService.refreshTokens(req.user.id, req.user.getRtHash());
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  @BaseAuthGuard()
  async getMe(@Req() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }
}