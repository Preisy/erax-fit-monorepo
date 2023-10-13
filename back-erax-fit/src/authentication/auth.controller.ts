import {
  Body,
  Controller,
  Get,
  Post,
  Req,
 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthRequest, AuthResponse } from './dto/auth.dto';
import { MainExceptionFilter } from '../exceptions/main-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { GetMeResponse } from './dto/getMe.dto';
import { RequestWithUser } from './types/requestWithUser.type';
import { BaseAuthGuard } from './guards/baseAuth.guard';
import { Use } from 'src/decorators/use.decorator';
import { DefaultApiResponse } from 'src/decorators/default.api.resonse.decorator';
import { Response201 } from 'src/api-responses/response.201';
import { Response200 } from 'src/api-responses/response.200';

@Controller('auth')
@ApiTags('Аутентификация')
@Use(MainExceptionFilter, ValidationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @DefaultApiResponse(new Response201(AuthResponse, 'Аутентификация'))
  async auth(@Body() body: AuthRequest) {
    return this.authService.auth(body);
  }

  @Get('me')
  @DefaultApiResponse(new Response200(GetMeResponse))
  @BaseAuthGuard()
  async getMe(@Req() req: RequestWithUser) {
    return this.authService.getMe(req.user.id);
  }
}
