import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';

@Controller('antropometrics')
@ApiTags('Client antropometrics')
@AppAuthGuard()
export class ClientAntropometricsController {}
