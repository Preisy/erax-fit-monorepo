import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
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

  @Post()
  @ApiResponse({
    status: 201,
    type: AuthResponse,
    description: 'Аутентификация',
  })
  
  async auth(@Body() body: AuthRequest) {
    return this.authService.auth(body);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshtoken(@Req() request){
    return this.authService.refresh(request.refreshToken);
  }

  @Get('me')
  @ApiResponse({
    status: 200,
    type: GetMeResponse,
    description: 'Получить свою сущность пользователя',
  })
  @BaseAuthGuard()
  async getMe(@Req() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }
}
