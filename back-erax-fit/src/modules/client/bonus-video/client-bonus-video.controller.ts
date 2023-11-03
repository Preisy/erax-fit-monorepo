import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { ClientBonusVideoService } from './client-bonus-video.service';

@Controller('bonus-video')
@ApiTags('Client bonus video')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientBonusVideoController {
  constructor(private readonly clientService: ClientBonusVideoService) {}
}
